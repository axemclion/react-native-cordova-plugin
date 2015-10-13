var CordovaPluginAdapter = require('./CordovaPluginAdapter.js');
var cordovaPluginAdapter = new CordovaPluginAdapter();

var cordova = {};
try {
    cordova = require('./../platforms/android/assets/cordova.js');
} catch (e) {
    console.log('Could not find cordova.js. Is it present in the platforms directory ? ');
}

cordova.init(cordovaPluginAdapter);

module.exports = cordova;
