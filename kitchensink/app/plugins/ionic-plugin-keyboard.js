import React, {
    Component,
    View,
    Text,
    Switch,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Cordova = require('react-native-cordova-plugin');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isKeyboardOn: false
        }
    }

    setKeyboard(isKeyboardOn) {
        if (isKeyboardOn) {
            Cordova.cordova.plugins.Keyboard.show();
        } else {
            Cordova.cordova.plugins.Keyboard.close();
        }
        this.setState({ isKeyboardOn });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>
                    Ionic Keyboard Plugin
                </Text>
                <Switch style={styles.switch}
                    onValueChange={isKeyboardOn => this.setKeyboard(isKeyboardOn) }
                    value = {this.state.isKeyboardOn}
                    />
                <Text style={styles.subtitle}>
                    Keyboard is currently {this.state.isKeyboardOn ? 'SHOWN' : 'HIDDEN'}
                </Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
    switch: {

    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20
    },
    subtitle: {
        textAlign: 'center'
    }
});