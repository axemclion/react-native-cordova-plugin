var CordovaPluginAdapter = require('./CordovaPluginAdapter.js');
var cordovaPluginAdapter = new CordovaPluginAdapter();

var cordova = require('./../platforms/android/assets/www/cordova.js');
cordova.init(cordovaPluginAdapter);

module.exports = cordova;
