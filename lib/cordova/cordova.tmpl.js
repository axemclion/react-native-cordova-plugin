var cordova = {};
var cordovaPluginAdapter = null;

var customModule = {
    exports: {}
};

(function(module) {
    /* Insert cordova-js/src/scripts/require-js */
    //<{{__REQUIRE__}}>
    /* End of custom require defination*/
}(customModule));

cordova.define = customModule.exports.define;
cordova.require = customModule.exports.require;

/** Insert definations from files in cordova-js/src/common/*.js **/
//<{{__CORDOVA__}}>
/** End of definations from modules in cordova-js/src/common/*.js **/

/** Insert definations from modules overriding Cordova **/
//<{{__CORDOVA_OVERRIDES__}}>
/** End of definations from custom **/

/** Insert all module definations  from plugins **/
//<{{__PLUGINS__}}>
/** End of Inserting plugins from JS **/

cordova.define("cordova", function(require, exports, module) {
    module.exports = {};
});

cordova.init = function(cordovaPluginAdapter) {
    cordova.pluginAdapter = cordovaPluginAdapter;
    cordova.require('cordova/pluginloader')(cordova);
};

module.exports = cordova;
