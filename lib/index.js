var ReactNative = require('react-native');
var Cordova = require('./cordova.js');

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var cordova = new Cordova(ReactNative.NativeModules.CordovaPluginAdapter);
module.exports = cordova;