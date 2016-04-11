// Loads all the cordova plugins
module.exports = function() {
    // Load each plugin
    var pluginList = require('cordova/plugin_list');
    var modulemapper = require('cordova/modulemapper');
    var channel = require('cordova/channel');

    pluginList.forEach(function(module) {
        try {
            if (module.clobbers && module.clobbers.length) {
                for (var j = 0; j < module.clobbers.length; j++) {
                    modulemapper.clobbers(module.id, module.clobbers[j]);
                }
            }

            if (module.merges && module.merges.length) {
                for (var k = 0; k < module.merges.length; k++) {
                    modulemapper.merges(module.id, module.merges[k]);
                }
            }

            // Finally, if runs is truthy we want to simply require() the module.
            if (module.runs) {
                modulemapper.runs(module.id);
            }

            modulemapper.mapModules(cordova);

        } catch (e) {
            console.error('Error loading Plugin %s', module.id, e);
        }
    });

    setTimeout(function() {
        channel.onPluginsReady.fire();
    }, 0);
};
