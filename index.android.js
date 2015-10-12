var ReactNative = require('react-native');
var Cordova = require('./lib/cordova/index.js');

var cordova = new Cordova(ReactNative.NativeModules.CordovaPluginAdapter);

module.exports = cordova;
