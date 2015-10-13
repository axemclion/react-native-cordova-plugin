// Loads all the cordova plugins
module.exports = function(global) {
    // Load each plugin
    var pluginList = require('cordova/plugin_list');

    function initializeSymbol(value) {
        return function(symbol) {
            var parts = symbol.split('.');
            var top = global;
            for (var i = 0; i < parts.length - 1; i++) {
                if (typeof top[parts[i]] === 'undefined') {
                    top[parts[i]] = {};
                }
                top = top[parts[i]];
            }
            top[parts[parts.length - 1]] = value;
        }
    }

    pluginList.forEach(function(pluginData) {
        try {
            var plugin = require(pluginData.id);
            if (typeof pluginData.clobbers !== 'undefined') {
                pluginData.clobbers.forEach(initializeSymbol(plugin));
            }
        } catch (e) {
            console.error('Error loading Plugin %s', pluginData.id, e);
        }
    });

    //TODO Implement merges in addition to clobbers
};
