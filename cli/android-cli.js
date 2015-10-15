var path = require('path');
var fs = require('fs');

var Q = require('q');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf')
var cordova = require('cordova-lib');
var glob = require('glob');

var CONFIG_XML = "<?xml version='1.0' encoding='utf-8'?><widget xmlns='http://www.w3.org/ns/widgets' xmlns:cdv='http://cordova.apache.org/ns/1.0'></widget>";
var STRING_XML = '<?xml version="1.0" encoding="UTF-8"?><resources></resources>';

var PLATFORM_DIR = path.resolve(__dirname, '../platforms/android');

cordova.events.on('verbose', require('debug')('rncp:cordova:verbose'));
cordova.events.on('log', require('debug')('rncp:cordova:log'));

function Android(projectRoot) {
    this.projectRoot = projectRoot;
}

Android.prototype.init = function() {
    if (this.isInitialized) {
        return;
    }
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'src'));
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'libs'));
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'res/xml'));
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'res/values'));
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'assets/www'));
    writeIfNotExists(path.resolve(PLATFORM_DIR, 'res/xml/config.xml'), CONFIG_XML);
    writeIfNotExists(path.resolve(PLATFORM_DIR, 'res/values/strings.xml'), STRING_XML);
    console.log('Initialized Android resources');

};

function writeIfNotExists(filename, data) {
    try {
        if (!fs.lstatSync(filename).isFile()) {
            throw ('This is not a file, so write it anyway');
        }
    } catch (e) {
        fs.writeFileSync(filename, data);
    }
}

Android.prototype.add = function(plugin) {
    this.init();
    return cordova.plugman.raw.install('android', PLATFORM_DIR, plugin, path.resolve(this.projectRoot, 'node_modules'), {
        platformVersion: '4.0.0',
        //TODO - figure out a way to make cordova browserify only to selectively pick files
        browserify: false
    }).then(function() {
        return generateCordovaJs();
    }).then(function() {
        console.log('Plugin %s added for Android', plugin);
    });
};

Android.prototype.remove = function(plugin) {
    return cordova.plugman.raw.uninstall('android', PLATFORM_DIR, plugin, path.resolve(this.projectRoot, 'node_modules'), {
        platformVersion: '4.0.0',
        browserify: false
    }).then(function() {
        return generateCordovaJs();
    }).then(function() {
        console.log('Plugin %s removed for Android', plugin);
    });
};

Android.prototype.clean = function() {
    var projectRoot = this.projectRoot;
    return Q().then(function() {
        rimraf.sync(path.resolve(projectRoot, 'node_modules/android.json'));
        rimraf.sync(path.resolve(projectRoot, 'node_modules/fetch.json'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'src'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'res'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'libs'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'assets'));
        console.log('If you still have trouble adding/removing plugins, delete all the plugin from node_modules');
    });
};

Android.prototype.repair = function() {
    return Q().then(function() {
        return generateCordovaJs();
    });
};

function generateCordovaJs() {
    var CORDOVA_JS = path.resolve(__dirname, '../node_modules/cordova-lib/node_modules/cordova-js/src');

    // TODO - Use a stream instead of reading all content to buffer
    var requireJSContent = fs.readFileSync(path.resolve(CORDOVA_JS, 'scripts/require.js'), 'utf-8');
    var pluginsContent = glob.sync('**/*.js', {
        cwd: path.resolve(PLATFORM_DIR, 'assets/www'),
        realpath: true
    }).map(function(filename) {
        return fs.readFileSync(filename, 'utf-8');
    }).join('\n');

    var cordovaModules = loadModules(['argscheck', 'utils', 'modulemapper', 'builder', 'channel', 'base64', 'urlutil'], path.join(CORDOVA_JS, 'common'));
    var customModules = loadModules(['pluginloader', 'platform', 'exec'], path.resolve(__dirname, '../lib/cordova'));

    var template = fs.readFileSync(path.resolve(__dirname, '../lib/cordova/cordova.tmpl.js'), 'utf-8');

    template = template
        .replace('//<{{__REQUIRE__}}>', requireJSContent)
        .replace('//<{{__CORDOVA__}}>', cordovaModules)
        .replace('//<{{__CORDOVA_OVERRIDES__}}>', customModules)
        .replace('//<{{__PLUGINS__}}>', pluginsContent)


    fs.writeFileSync(path.join(PLATFORM_DIR, 'assets/cordova.js'), template);
    console.log('Generated cordova.js');
};

function loadModules(modules, location) {
    return modules.map(function(module) {
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
