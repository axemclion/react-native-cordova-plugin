var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

function Cordova(CordovaPluginAdapter) {
    this.nativeInterface = CordovaPluginAdapter;
    this._callbackCount = 0;
    this._callbacks = {};

    this.initCallbackChannel();
};

Cordova.prototype.exec = function(success, fail, service, action, args) {
    this._callbacks[this._callbackCount] = {
        success: success,
        fail: fail
    };
    this.nativeInterface.exec(service, action, this._callbackCount, args);
    this._callbackCount++;
};

Cordova.prototype.initCallbackChannel = function() {
    RCTDeviceEventEmitter.addListener('CordovaWebViewProxy', function(params) {
        console.log(params);
    }, this);
};

module.exports = Cordova;
