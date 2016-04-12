const PLUGINS = [
    { id: 'cordova-plugin-camera', name: 'Camera', module: require('./cordova-plugin-camera').default },
    { id: 'cordova-plugin-contacts', name: 'Contacts', module: require('./cordova-plugin-contacts').default },
    { id: 'cordova-plugin-dialogs', name: 'Dialogs', module: require('./cordova-plugin-dialogs').default },
    { id: 'cordova-plugin-device', name: 'Device', module: require('./cordova-plugin-device').default },
    { id: 'cordova-plugin-network-information', name: 'Network Information', module: require('./cordova-plugin-network-information').default }
];

export default PLUGINS;