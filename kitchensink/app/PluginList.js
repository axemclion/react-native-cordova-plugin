const PLUGIN_LIST = [
    { id: 'cordova-plugin-camera', name: 'Camera', module: require('./plugins/camera').default },
    { id: 'cordova-plugin-contacts', name: 'Contacts', module: require('./plugins/contacts').default },
    { id: 'cordova-plugin-dialogs', name: 'Dialogs', module: require('./plugins/dialogs').default, icon: 'ios-list' },
    { id: 'cordova-plugin-device', name: 'Device', module: require('./plugins/device').default, icon: 'android-phone-portrait' },
    { id: 'cordova-plugin-network-information', name: 'Network Information', module: require('./plugins/network-information').default, icon: 'network' }

];

class PluginList {
    all() {
        return PLUGIN_LIST;
    }

    findById(pluginId) {
        let plugin = PLUGIN_LIST.filter((plugin) => plugin.id === pluginId);
        if (plugin.length === 1) {
            return plugin[0];
        }
    }
}

export default new PluginList();