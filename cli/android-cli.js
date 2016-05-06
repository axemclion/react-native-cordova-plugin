var path = require('path');
var fs = require('fs');

var Q = require('q');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf')
var cordova = require('cordova-lib');
var glob = require('glob');

var CONFIG_XML = "<?xml version='1.0' encoding='utf-8'?><widget xmlns='http://www.w3.org/ns/widgets' xmlns:cdv='http://cordova.apache.org/ns/1.0'></widget>";
var STRING_XML = '<?xml version="1.0" encoding="UTF-8"?><resources></resources>';
var ANDROID_MANIFEST = "<?xml version='1.0' encoding='utf-8'?><manifest package='io.cordova.reactnative.cordovaplugin' xmlns:android='http://schemas.android.com/apk/res/android'></manifest>";
var PLUGIN_GRADLE = "dependencies {compile fileTree(dir: 'libs', include: '*.jar')\n// SUB-PROJECT DEPENDENCIES START\n\n// SUB-PROJECT DEPENDENCIES END\n}\n// PLUGIN GRADLE EXTENSIONS START\n// PLUGIN GRADLE EXTENSIONS END";
var PLATFORM_DIR = path.resolve(__dirname, '../platforms/android');

cordova.events.on('verbose', console.log.bind(console));
cordova.events.on('log', console.log.bind(console));

function Android(projectRoot) {
    this.projectRoot = projectRoot;
}

Android.prototype.init = function () {
    if (this.isInitialized) {
        return;
    }
    createDirectories(['src', 'libs', 'res/xml', 'res/values', 'assets/www']);
    writeIfNotExists('res/xml/config.xml', CONFIG_XML);
    writeIfNotExists('res/values/strings.xml', STRING_XML);
    writeIfNotExists('project.properties', '');
    writeIfNotExists('plugin-build.gradle', PLUGIN_GRADLE);
    writeIfNotExists('AndroidManifest.xml', ANDROID_MANIFEST);
    console.log('Initialized Android resources');
};

function createDirectories(dirs) {
    dirs.forEach(function (dir) {
        mkdirp.sync(path.resolve(PLATFORM_DIR, dir));
    });
}

function writeIfNotExists(filename, data) {
    filename = path.resolve(PLATFORM_DIR, filename);
    try {
        if (!fs.lstatSync(filename).isFile()) {
            throw ('This is not a file, so write it anyway');
        }
    } catch (e) {
        fs.writeFileSync(filename, data);
    }
}

// takes an array or variables and turns them into an object to be consumed by plugman
function mapVariablesToObject(variables) {
  var plugmanConsumableVariables = {};
  for (var i in variables) {
    var t = variables[i].split('=');
    if (t[0] && t[1]) {
      plugmanConsumableVariables[t[0]] = t[1];
    }
  }
  return plugmanConsumableVariables;
}

Android.prototype.add = function (plugin, variables) {
    this.init();
    var self = this;
    var plugmanConsumableVariables = mapVariablesToObject(variables);
    return cordova.plugman.raw.install('android', PLATFORM_DIR, plugin, path.resolve(this.projectRoot, 'node_modules'), {
        platformVersion: '5.0.0',
        //TODO - figure out a way to make cordova browserify only to selectively pick files
        browserify: false,
        cli_variables: plugmanConsumableVariables
    }).then(function () {
        return generateCordovaJs(self.projectRoot);
    }).then(function () {
        return prepBuildFiles();
    });
};

Android.prototype.remove = function (plugin) {
    var self = this;
    return cordova.plugman.raw.uninstall('android', PLATFORM_DIR, plugin, path.resolve(this.projectRoot, 'node_modules'), {
        platformVersion: '5.0.0',
        browserify: false
    }).then(function () {
        return generateCordovaJs(self.projectRoot);
    });
};

Android.prototype.clean = function () {
    var projectRoot = this.projectRoot;
    return Q().then(function () {
        rimraf.sync(PLATFORM_DIR);
        rimraf.sync(path.resolve(projectRoot, 'node_modules/android.json'));
        rimraf.sync(path.resolve(projectRoot, 'node_modules/fetch.json'));
        rimraf.sync(path.resolve(projectRoot, 'node_modules/android'))
    });
};

Android.prototype.repair = function () {
    var self = this;
    return Q().then(function () {
        return generateCordovaJs(self.projectRoot);
    });
};

// Based on https://github.com/apache/cordova-android/blob/d351e316bfb0d1d8800e6f51bc1e926aac295ab4/bin/templates/cordova/lib/builders/GradleBuilder.js#L67
// Required to parse dependencies for Gradle that have been added in project.properties
function prepBuildFiles(root) {
    var propertiesObj = readProjectProperties(path.join(PLATFORM_DIR, 'project.properties'));
    var subProjects = propertiesObj.libs;
    // Update dependencies within build.gradle.
    var buildGradle = fs.readFileSync(path.join(PLATFORM_DIR, 'plugin-build.gradle'), 'utf-8');
    var depsList = '';
    subProjects.forEach(function (p) {
        var libName = p.replace(/[/\\]/g, ':').replace(name + '-', '');
        depsList += 'debugCompile project(path: "' + libName + '", configuration: "debug")\n';
        depsList += 'releaseCompile project(path: "' + libName + '", configuration: "release")\n';
    });
    // For why we do this mapping: https://issues.apache.org/jira/browse/CB-8390
    var SYSTEM_LIBRARY_MAPPINGS = [
        [/^\/?extras\/android\/support\/(.*)$/, 'com.android.support:support-$1:+'],
        [/^\/?google\/google_play_services\/libproject\/google-play-services_lib\/?$/, 'com.google.android.gms:play-services:+']
    ];
    propertiesObj.systemLibs.forEach(function (p) {
        var mavenRef;
        // It's already in gradle form if it has two ':'s
        if (/:.*:/.exec(p)) {
            mavenRef = p;
        } else {
            for (var i = 0; i < SYSTEM_LIBRARY_MAPPINGS.length; ++i) {
                var pair = SYSTEM_LIBRARY_MAPPINGS[i];
                if (pair[0].exec(p)) {
                    mavenRef = p.replace(pair[0], pair[1]);
                    break;
                }
            }
            if (!mavenRef) {
                throw new error('Unsupported system library (does not work with gradle): ' + p);
            }
        }
        depsList += 'compile "' + mavenRef + '"\n';
    });
    buildGradle = buildGradle.replace(/(SUB-PROJECT DEPENDENCIES START)[\s\S]*(\/\/ SUB-PROJECT DEPENDENCIES END)/, '$1\n' + depsList + '    $2');
    var includeList = '';
    propertiesObj.gradleIncludes.forEach(function (includePath) {
        includeList += 'apply from: "$projectDir/../../platforms/android/' + includePath + '"\n';
    });
    buildGradle = buildGradle.replace(/(PLUGIN GRADLE EXTENSIONS START)[\s\S]*(\/\/ PLUGIN GRADLE EXTENSIONS END)/, '$1\n' + includeList + '$2');
    fs.writeFileSync(path.join(PLATFORM_DIR, 'plugin-build.gradle'), buildGradle);
}

function readProjectProperties(propertyFile) {
    function findAllUniq(data, r) {
        var s = {};
        var m;
        while ((m = r.exec(data))) {
            s[m[1]] = 1;
        }
        return Object.keys(s);
    }

    var data = fs.readFileSync(propertyFile, 'utf8');
    return {
        libs: findAllUniq(data, /^\s*android\.library\.reference\.\d+=(.*)(?:\s|$)/mg),
        gradleIncludes: findAllUniq(data, /^\s*cordova\.gradle\.include\.\d+=(.*)(?:\s|$)/mg),
        systemLibs: findAllUniq(data, /^\s*cordova\.system\.library\.\d+=(.*)(?:\s|$)/mg)
    };
}

function findCordovaJSModule(projectRoot) {
    // Look for Cordova-js under ReactNative's node_modules
    var cordovaJSNpm = glob.sync('**/cordova-js', {
        cwd: path.resolve(projectRoot, 'node_modules'),
        realpath: true
    });
    if (cordovaJSNpm.length === 1) {
        return path.join(cordovaJSNpm[0], 'src');
    }

    // Look for Cordova-js under this project's node_modules
    cordovaJSNpm = glob.sync('**/cordova-js', {
        cwd: path.resolve(__dirname, '../node_modules'),
        realpath: true
    });
    if (cordovaJSNpm.length === 1) {
        return path.join(cordovaJSNpm[0], 'src');
    }

    console.log('Could not find Cordova-JS node module. Is it installed in the node_modules folder ? ');
    throw 'Could not find cordova-js node module.';
}

function generateCordovaJs(projectRoot) {

    // TODO - Use a stream instead of reading all content to buffer
    var CORDOVA_JS = findCordovaJSModule(projectRoot);
    var requireJSContent = fs.readFileSync(path.resolve(CORDOVA_JS, 'scripts/require.js'), 'utf-8');
    var pluginsContent = glob.sync('**/*.js', {
        cwd: path.resolve(PLATFORM_DIR, 'platform_www'),
        realpath: true
    }).map(function (filename) {
        return fs.readFileSync(filename, 'utf-8');
    }).join('\n');

    var cordovaModules = loadModules(['argscheck', 'utils', 'modulemapper', 'builder', 'channel', 'base64', 'urlutil'], path.join(CORDOVA_JS, 'common'));
    var customModules = loadModules(['events', 'pluginloader', 'platform', 'exec'], path.resolve(__dirname, '../lib/cordova'));

    var template = fs.readFileSync(path.resolve(__dirname, '../lib/cordova/cordova.tmpl.js'), 'utf-8');

    template = template
        .replace('//<{{__REQUIRE__}}>', requireJSContent)
        .replace('//<{{__CORDOVA__}}>', cordovaModules)
        .replace('//<{{__CORDOVA_OVERRIDES__}}>', customModules)
        .replace('//<{{__PLUGINS__}}>', pluginsContent)


    fs.writeFileSync(path.join(PLATFORM_DIR, 'assets/www/cordova.js'), template);
    console.log('Generated cordova.js');
};

function loadModules(modules, location) {
    return modules.map(function (module) {
        var fileContent = '';
        try {
            fileContent = fs.readFileSync(path.join(location, module + '.js'));
        } catch (e) {
            console.log('Error when constructing cordova.js', e);
        }
        return 'cordova.define("cordova/' + module + '", function(require, exports, module) {' + fileContent + '});'
    }).join('\n');
}

module.exports = Android;
