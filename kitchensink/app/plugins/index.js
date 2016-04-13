const PLUGINS = [
    { id: 'cordova-plugin-camera', name: 'Camera', module: require('./cordova-plugin-camera').default },
    { id: 'cordova-plugin-contacts', name: 'Contacts', module: require('./cordova-plugin-contacts').default },
    { id: 'cordova-plugin-dialogs', name: 'Dialogs', module: require('./cordova-plugin-dialogs').default },
    { id: 'cordova-plugin-device', name: 'Device', module: require('./cordova-plugin-device').default },
    { id: 'cordova-plugin-network-information', name: 'Network Information', module: require('./cordova-plugin-network-information').default },
    { id: 'ionic-plugin-keyboard', name: 'Ionic Keyboard', module: require('./ionic-plugin-keyboard').default },
    { id: 'cordova-plugin-statusbar', name: 'Statusbar', module: require('./cordova-plugin-statusbar').default },
    { id: 'cordova-plugin-globalization', name: 'Globalization', module: require('./cordova-plugin-globalization').default }
];

export default PLUGINS;