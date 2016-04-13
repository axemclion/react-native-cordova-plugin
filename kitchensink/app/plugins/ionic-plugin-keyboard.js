import React, {
    Component,
    View,
    Text,
    Switch,
    TextInput,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Cordova = require('react-native-cordova-plugin');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            isKeyboardOn: false
        };
        this.handlers = [];
    }
    
    componentDidMount() {
        this.handlers.push(Cordova.addEventListener('native.keyboardshow', e => this.keyboardEvent(true, e)));
        this.handlers.push(Cordova.addEventListener('native.keyboardhide', e => this.keyboardEvent(false, e)));
    }
    
    componentWillUnmount() {
        this.handlers.forEach(handler => handler.remove());
    }
    
    keyboardEvent(isKeyboardOn, eventData){
        this.setState({
            isKeyboardOn,
            event: {
                eventName: isKeyboardOn  ? 'Keyboard Show' : 'Keyboard Close',
                eventData
            }
        });
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
                <Console message={this.state.event}/>
                <TextInput placeholder="Click here to open keyboard"/>

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