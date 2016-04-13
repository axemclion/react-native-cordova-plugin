// Loads all the cordova plugins
module.exports = function(context) {
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

        } catch (e) {
            console.error('Error loading Plugin %s', module.id, e);
        }
    });
    modulemapper.mapModules(context);

    // FIX for plugins like ionic-plugin-keyboard that assume that 
    // cordova is always available on window object. This is not always true
    if (context.cordova) {
        for (var key in context.cordova) {
            if (typeof context[key] !== 'undefined') {
                console.error('cordova[' + key + '] is already defined, the plugin is trying to re-define it');
            } else {
                context[key] = context.cordova[key];
            }
        }
    }
    // END of fix

    setTimeout(function() {
        channel.onPluginsReady.fire();
    }, 0);
};
