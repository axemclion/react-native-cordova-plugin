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
            event: 'Unsubscribed from events',
            isKeyboardOn: false,
            eventSubscription: false
        };
        this.handlers = [];
    }
    
    componentWillUnmount() {
        this.setEventSubscription(false);
    }
    
    keyboardEvent(isKeyboardOn, eventData){
        this.setState({
            isKeyboardOn,
            event: {
                eventName: isKeyboardOn  ? 'native.keyboardshow' : 'native.keyboardhide',
                eventData
            }
        });
    }
    
    setKeyboard(isKeyboardOn) {
        Cordova.cordova.plugins.Keyboard[isKeyboardOn ? 'show' : 'close']();
        this.setState({ isKeyboardOn });
    }

    setEventSubscription(eventSubscription){
        this.setState({eventSubscription});
        if (eventSubscription){
            this.handlers.push(Cordova.addEventListener('native.keyboardshow', e => this.keyboardEvent(true, e)));
            this.handlers.push(Cordova.addEventListener('native.keyboardhide', e => this.keyboardEvent(false, e)));
        } else {
            this.handlers.forEach(handler => handler.remove());
            this.setState({event: 'Unsubscribed from events'})
            this.handlers = [];
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.switchContainer}>
                    <Text>Use the switch to toggle the keyboard</Text>
                    <Switch style={styles.switch}
                        onValueChange={this.setKeyboard.bind(this)}
                        value = {this.state.isKeyboardOn}
                        />
                </View>
                <View style={styles.switchContainer}>
                    <Text>Subscribe to event</Text>
                    <Switch style={styles.switch}
                        onValueChange={this.setEventSubscription.bind(this) }
                        value = {this.state.eventSubscription}
                        />
                </View>
                <Console message={this.state}/>
                <TextInput placeholder="Start typing here to open keyboard"/>
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
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 20
    }
});