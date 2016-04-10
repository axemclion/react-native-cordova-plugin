const PLUGIN_LIST = [
    { id: 'cordova-plugin-camera', name: 'Camera', module: require('./plugins/camera').default },
    { id: 'cordova-plugin-contacts', name: 'Contacts', module: require('./plugins/contacts').default }
];

class PluginList{
    all(){
        return PLUGIN_LIST;
    }
    
    findById(pluginId){
        let plugin = PLUGIN_LIST.filter((plugin) => plugin.id === pluginId);
        if (plugin.length === 1) {
            return plugin[0];
        } 
    }
}

export default new PluginList();