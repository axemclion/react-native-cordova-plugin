var path = require('path');
var glob = require('glob').sync;
var fork = require('child_process').fork;

var rncp = path.resolve(__dirname, 'node_modules/react-native-cordova-plugin/cli/cli.js');

var plugins = glob('*.js', {
    cwd: path.resolve(__dirname, './app/plugins')
}).map(function(plugin) {
    if (plugin !== 'index.js') {
        return path.basename(plugin, '.js');
    }
}).filter(function(a) {
    return !!a;
});

fork(rncp, ['clean']).on('exit', function() {
    fork(rncp, ['add'].concat(plugins));
});

