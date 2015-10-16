#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var Q = require('q');

// TODO Check if this is a react-native project. 
var projectDir = '.';

var Android = require('./android-cli');

var android = new Android(projectDir);

var commands = {
    add: function(plugins) {
        console.log('Adding plugins %s', plugins.join());
        return plugins.map(function(pluginName) {
            return function() {
                return android.add(pluginName);
            }
        }).reduce(Q.when, Q());
    },
    rm: function(plugins) {
        console.log('Removing plugins %s', plugins.join());
        return plugins.map(function(pluginName) {
            return function() {
                return android.remove(pluginName);
            }
        }).reduce(Q.when, Q());
    },
    clean: function() {
        console.log('Cleaning all plugins and other artifacts');
        return android.clean();
    },
    repair: function() {
        console.log('Re-creating CordovaJS');
        return android.repair();
    }
};

var plugins = argv._.slice(1);
var command = '';
switch (argv._[0]) {
    case 'add':
    case 'install':
        command = 'add';
        break;
    case 'rm':
    case 'remove':
    case 'uninstall':
        command = 'rm';
        break;
    default:
        command = argv._[0];
}

if (typeof commands[command] === 'function') {
    commands[command](plugins).done();
} else {
    console.log('Could not recognize command ', argv._[0]);
    console.log('Usage : %s [add|remove] cordova-plugin-name1 cordova-plugin-name1', process.argv[1]);
}
