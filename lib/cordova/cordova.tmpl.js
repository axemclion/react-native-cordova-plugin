var cordova = {
    fireWindowEvent: function() { },
    fireDocumentEvent: function() { },
    addEventListener: function() { }
};
var cordovaPluginAdapter = null;

var customModule = {
    exports: {}
};

(function(module) {
    /* Insert cordova-js/src/scripts/require-js */
    //<{{__REQUIRE__}}>
    /* End of custom require defination*/
} (customModule));

cordova.define = customModule.exports.define;
cordova.require = customModule.exports.require;

var define = cordova.define;
/** Insert definations from files in cordova-js/src/common/*.js **/
//<{{__CORDOVA__}}>
/** End of definations from modules in cordova-js/src/common/*.js **/

/** Insert definations from modules overriding Cordova **/
//<{{__CORDOVA_OVERRIDES__}}>
/** End of definations from custom **/

/** Insert all module definations  from plugins **/
//<{{__PLUGINS__}}>
/** End of Inserting plugins from JS **/

cordova.define("cordova", function(require, exports, module) { module.exports = cordova });

cordova.init = function(cordovaPluginAdapter) {
    var channel = cordova.require('cordova/channel');
    var platform = cordova.require('cordova/platform');

    channel.onDOMContentLoaded.fire();
    channel.onNativeReady.fire();

    platform.bootstrap && platform.bootstrap();

    cordova.pluginAdapter = cordovaPluginAdapter;
    cordova.require('cordova/pluginloader')(cordova);

    channel.onCordovaReady.fire();
};

cordova.exec = cordova.require('cordova/exec');

module.exports = cordova;
