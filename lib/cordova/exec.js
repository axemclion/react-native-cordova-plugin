module.exports = function() {
    if (typeof cordova.pluginAdapter === 'undefined') {
        throw 'Cordova Plugin Adapter is not initialized or defined';
    }
    return cordova.pluginAdapter.exec.apply(cordova.pluginAdapter, arguments);
}
