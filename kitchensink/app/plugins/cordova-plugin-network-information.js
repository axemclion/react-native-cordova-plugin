import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Switch
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
        this.state = { network: '' , event: 'Unsubscribed from events', eventSubscription: false};
        this.handlers = [];
    }

    componentDidMount() {
        this.setState({ network: getConnectionType(Cordova.navigator.connection.type) });
    }

    componentWillUnmount() {
        this.setEventSubscription(false);
    }
    
    setEventSubscription(eventSubscription){
        this.setState({eventSubscription});
        if (eventSubscription){
            this.handlers.push(Cordova.addEventListener('offline', () => this.setState({event: 'Offline event triggered'})));
            this.handlers.push(Cordova.addEventListener('online', () => this.setState({event:  'Online event triggered'})));
        } else {
            this.handlers.forEach(handler => handler.remove());
            this.setState({event : 'Unsubscribed from events'});
            this.handlers = [];
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text>This plugin runs on start, so this information is already populated in the Cordova.navigator.connection object</Text>
                <View style={styles.switchContainer}>
                    <Text>Subscribed to events</Text>
                    <Switch style={styles.switch}
                        onValueChange={val => this.setEventSubscription(val) }
                        value = {this.state.eventSubscription}
                        />
                </View>
                <Console message={this.state}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        marginTop: 20
    }
});