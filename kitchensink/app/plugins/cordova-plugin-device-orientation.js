import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

export default class NetworkInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventSubscription: false,
            result: '',
            error: null
        };
    }

    
    getCurrentHeading() {
        Cordova.navigator.compass.getCurrentHeading(
            (result) => this.setState({result}), 
            (error) => this.setState({error})    
        );
    }
    
    setEventSubscription(eventSubscription) {
        this.setState({eventSubscription});
        if (eventSubscription){
            this.watchID = Cordova.navigator.compass.watchHeading(
                (result) => this.setState({result}), 
                (error) => this.setState({error}), 
                {frequency: 1000}
            );
        } else {
            this.setState({result: 'Unsubscribed from event'});
            Cordova.navigator.compass.clearWatch(this.watchID); 
        }
    }
    
    componentWillUnmount() {
        this.setEventSubscription(false);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Icon.Button name="android-compass" onPress={this.getCurrentHeading.bind(this)}>
                    Get Current Heading
                </Icon.Button>
                <View style={styles.switchContainer}>
                    <Text>Watch Heading</Text>
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