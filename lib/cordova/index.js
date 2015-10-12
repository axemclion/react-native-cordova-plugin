var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var callbackStatus = {
    NO_RESULT: 0,
    OK: 1,
    CLASS_NOT_FOUND_EXCEPTION: 2,
    ILLEGAL_ACCESS_EXCEPTION: 3,
    INSTANTIATION_EXCEPTION: 4,
    MALFORMED_URL_EXCEPTION: 5,
    IO_EXCEPTION: 6,
    INVALID_ACTION: 7,
    JSON_EXCEPTION: 8,
    ERROR: 9
};

function Cordova(CordovaPluginAdapter) {
    this.nativeInterface = CordovaPluginAdapter;
    this._callbackCount = Math.random();
    this._callbacks = {};

    this.initCallbackChannel();
};

Cordova.prototype.exec = function(success, fail, service, action, args) {
    var callbackId = [service, action, this._callbackCount].join(':');
    this._callbacks[callbackId] = {
        success: success,
        fail: fail
    };
    this.nativeInterface.exec(service, action, callbackId, JSON.stringify(args));
    this._callbackCount++;
};

Cordova.prototype.initCallbackChannel = function() {
    RCTDeviceEventEmitter.addListener('CordovaWebViewProxy', this.onChannelCallback, this);
};

Cordova.prototype.onChannelCallback = function(params) {
    if (typeof this._callbacks[params.callbackId] === 'object') {
        var result = null;
        switch (params.messageType) { // Types defined in Java
            case 1: //String
                result = params.message;
                break;
            case 2: // JSON
                result = JSON.parse(params.message);
                break;
            case 3: // Number
                result = parseFloat(params.message);
            case 4: // Boolean
                result = !!params.message;
                break;
            case 5: // Null
                result = null;
                break;
            case 6: // Array Buffer
                result = params.message;
                break;
            case 7: // Binary String
                result = params.message;
                break;
            case 8: // Multipart
                result = params.message;
                break;
        }
        try {
            if (params.status === callbackStatus.OK) {
                this._callbacks[params.callbackId].success(result);
            } else if (param.status > callbackStatus.OK) {
                this._callbacks[params.callbackId].fail(result);
            }
        } finally {
            if (!params.keepCallback) {
                delete this._callbacks[params.callbackId];
            }
        }
    }
};

module.exports = Cordova;
