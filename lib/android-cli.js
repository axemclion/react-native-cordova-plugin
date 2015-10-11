var path = require('path');
var fs = require('fs');

var Q = require('q');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf')
var cordova = require('cordova-lib');

var CONFIG_XML = "<?xml version='1.0' encoding='utf-8'?><widget xmlns='http://www.w3.org/ns/widgets' xmlns:cdv='http://cordova.apache.org/ns/1.0'></widget>";

var PLATFORM_DIR = path.resolve(__dirname, '../platforms/android');

function Android(projectRoot) {
    this.projectRoot = projectRoot;
    this.init();
}

Android.prototype.init = function() {
    if (this.isInitialized) {
        return;
    }
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'src'));
    mkdirp.sync(path.resolve(PLATFORM_DIR, 'res/xml'));
    writeIfNotExists(path.resolve(PLATFORM_DIR, 'res/xml/config.xml'), CONFIG_XML);
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

Android.prototype.clean = function() {
    var projectRoot = this.projectRoot;
    return Q().then(function() {
        rimraf.sync(path.resolve(projectRoot, 'node_modules/android.json'));
        rimraf.sync(path.resolve(projectRoot, 'node_modules/fetch.json'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'src'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'res'));
        rimraf.sync(path.resolve(PLATFORM_DIR, 'assets'));
        console.log('If you still have trouble adding/removing plugins, delete each plugin from node_modules');
    });
};

module.exports = Android;
