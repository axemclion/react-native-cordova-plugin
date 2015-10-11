var path = require('path');
var fs = require('fs');

var mkdirp = require('mkdirp');
var rimraf = require('rimraf')
var cordova = require('cordova-lib');

var CONFIG_XML = "<?xml version='1.0' encoding='utf-8'?><widget xmlns='http://www.w3.org/ns/widgets' xmlns:cdv='http://cordova.apache.org/ns/1.0'></widget>";

var PLATFORM_DIR = path.resolve(__dirname, '../plugins/android');

function Android(projectRoot) {
    this.projectRoot = projectRoot;
    this.init();
}

Android.prototype.init = function() {
    if (this.isInitialized) {
        return;
    }
    console.log('Initializing Android resources');
    var res = mkdirp.sync(path.resolve(PLATFORM_DIR, 'src'));
    console.log('Created directory %s', res);

    res = mkdirp.sync(path.resolve(PLATFORM_DIR, 'res/xml'));
    console.log('Created directory for config - %s', res);

    writeIfNotExists(path.resolve(PLATFORM_DIR, 'res/xml/config.xml'), CONFIG_XML);
};

function writeIfNotExists(filename, data) {
    try {
        if (!fs.lstatSync(filename).isFile()) {
            throw('This is not a file, so write it anyway')
        }
    } catch (e) {
        fs.writeFileSync(filename, data);
    }
}

Android.prototype.add = function(plugin) {
    return cordova.plugman.raw.install(
        'android',
        PLATFORM_DIR,
        plugin,
        path.resolve(this.projectRoot, 'node_modules'), {
            platformVersion: '4.0.0',
        });
};

Android.prototype.remove = function(plugin) {
    return cordova.plugman.raw.uninstall(
        'android',
        PLATFORM_DIR,
        plugin,
        path.resolve(this.projectRoot, 'node_modules'), {
            platformVersion: '4.0.0',
        });
};

module.exports = Android;
