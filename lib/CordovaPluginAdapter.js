var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var ReactNative = require('react-native');

function CordovaPluginAdapter() {
    this.nativeInterface = ReactNative.NativeModules.CordovaPluginAdapter;
    this._callbackCount = Math.random();
    this._callbacks = {};

    this.initCallbackChannel();
};

CordovaPluginAdapter.prototype.exec = function(success, fail, service, action, args) {
    var callbackId = [service, action, this._callbackCount].join(':');
    this._callbacks[callbackId] = {
        success: success,
        fail: fail
    };
    this.nativeInterface.exec(service, action, callbackId, JSON.stringify(args));
    this._callbackCount++;
};

CordovaPluginAdapter.prototype.initCallbackChannel = function() {
    RCTDeviceEventEmitter.addListener('CordovaWebViewProxy', this.onChannelCallback, this);
};

CordovaPluginAdapter.prototype.onChannelCallback = function(params) {
    if (typeof this._callbacks[params.callbackId] === 'object') {
        var result = JSON.parse(params.message);
        // Callback status - https://github.com/apache/cordova-js/blob/064b25a40aab8fc2f210fdbb394d63c31e7d3e6d/src/cordova.js#L174
        try {
            if (params.status === 1) {
                this._callbacks[params.callbackId].success(result);
            } else if (params.status > 1) {
                this._callbacks[params.callbackId].fail(result);
            }
        } finally {
            if (!params.keepCallback) {
                delete this._callbacks[params.callbackId];
            }
        }
    }
};

module.exports = CordovaPluginAdapter;
