var CordovaPluginAdapter = require('./CordovaPluginAdapter.js');
var cordovaPluginAdapter = new CordovaPluginAdapter();

var cordova = require('./../platforms/android/assets/www/cordova.js');
setTimeout(function() {
    cordova.init(cordovaPluginAdapter);
}, 0);

module.exports = cordova;
