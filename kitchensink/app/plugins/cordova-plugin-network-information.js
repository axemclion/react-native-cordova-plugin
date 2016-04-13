import React, {
    Component,
    View,
    Text,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

function getConnectionType(type) {
    var state = {};
    state[Cordova.Connection.UNKNOWN] = 'Unknown connection';
    state[Cordova.Connection.ETHERNET] = 'Ethernet connection';
    state[Cordova.Connection.WIFI] = 'WiFi connection';
    state[Cordova.Connection.CELL_2G] = 'Cell 2G connection';
    state[Cordova.Connection.CELL_3G] = 'Cell 3G connection';
    state[Cordova.Connection.CELL_4G] = 'Cell 4G connection';
    state[Cordova.Connection.CELL] = 'Cell generic connection';
    state[Cordova.Connection.NONE] = 'No network connection';
    return state[type];
}

export default class NetworkInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' , event: null};
        this.handlers = [];
    }

    componentDidMount() {
        this.setState({ message: 'Network Connection Type: ' + getConnectionType(Cordova.navigator.connection.type) });
        this.handlers.push(Cordova.addEventListener('offline', () => this.setState({event: 'Offline event triggered'})));
        this.handlers.push(Cordova.addEventListener('online', () => this.setState({event:  'Online event triggered'})));
    }

    componentWillUnmount() {
        this.handlers.forEach(handler => handler.remove());
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>This plugin runs on start, so this information is already populated in the Cordova.navigator.connection object</Text>
                <Console message={this.state}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
});