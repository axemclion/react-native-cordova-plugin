var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var Q = require('q');

// TODO Check if this is a react-native project. 
var projectDir = '.';

var Android = require('./android-cli');

var android = new Android(projectDir);

var commands = {
    add: function(plugin) {
        console.log('Adding plugin %s', plugin);
        return android.add(plugin);
    },
    rm: function(plugin) {
        console.log('Removing plugin %s', plugin);
        return android.remove(plugin);
    }
};

var plugin = argv._[1];
var command = '';
switch (argv._[0]) {
    case 'add':
    case 'install':
        command = 'add';
        break;
    case 'rm':
    case 'remove':
    case 'uninstall':
        command = 'remove';
        break;
}

if (typeof commands[command] === 'function') {
    commands[command](plugin).done();
} else {
    console.log('Could not recognize command ', argv._[0]);
    console.log('Usage : %s [add|rm] cordova-plugin-name', process.argv[1]);
}
