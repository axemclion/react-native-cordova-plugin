import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Cordova = require('react-native-cordova-plugin');
const Icon = require('react-native-vector-icons/Ionicons');

function randomColor(){
    var items = ['black', 'darkGray', 'lightGray', 'white', 'gray', 'red', 'green', 'blue', 'cyan', 'yellow', 'magenta', 'orange', 'purple', 'brown'];
    return items[Math.floor(Math.random()*items.length)];
}

function randomHexColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

export default class extends Component {
    show(){ Cordova.window.StatusBar.show(); }
    hide(){ Cordova.window.StatusBar.hide(); }
    backgroundColorByName() {Cordova.window.StatusBar.backgroundColorByName(randomColor());}
    backgroundColorByHexString() {Cordova.window.StatusBar.backgroundColorByHexString(randomHexColor());}

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Icon.Button name='star' onPress={this.show}>Show StatusBar</Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name='star' onPress={this.hide}>Hide StatusBar</Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name='star' onPress={this.backgroundColorByName}>Change color By Name</Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name='star' onPress={this.backgroundColorByHexString}>Change color By HEX</Icon.Button>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'stretch'
    }, 
    
    button: {
        margin: 10
    }
});