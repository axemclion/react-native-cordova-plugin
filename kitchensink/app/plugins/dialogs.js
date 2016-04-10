import React, {
    Component,
    View,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

export default class Dialogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Click on a button to see result'
        };
    }

    alert() {
        Cordova.navigator.notification.alert(
            'This is an alert message',
            () => this.setState({ message: 'Alert box dismissed' }),
            'Alert Msg Title',
            'Dismiss - Alert Button'
        );
    }

    confirm() {
        Cordova.navigator.notification.confirm(
            'Confirmation dialog box message',
            (message) => this.setState({ message: 'Clicked on button : ' + message }),
            'Confirm Box Title',
            ['OK', 'Cancel', 'Whatever', 'Cats']
        );
    }

    prompt() {
        Cordova.navigator.notification.prompt(
            'Prompt Dialog box message',
            (message) => this.setState({ message }),
            'Prompt Box Title',
            ['Good', 'Bad', 'Ugly'],
            'Default prompt message'
        );
    }

    beep() {
        Cordova.navigator.notification.beep(3);
        this.setState({ message: 'Should have beeped 3 times' });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Icon.Button style={styles.button} name="android-alert" onPress={() => this.alert() }>
                        Alert
                    </Icon.Button>
                    <Icon.Button style={styles.button} name="help-circled" onPress={() => this.confirm() }>
                        Confirm
                    </Icon.Button>
                    <Icon.Button style={styles.button} name="android-checkmark-circle" onPress={() => this.prompt() }>
                        Prompt
                    </Icon.Button>
                    <Icon.Button style={styles.button} name="ios-bell" onPress={() => this.beep() }>
                        Beep
                    </Icon.Button>
                </View>
                <Console message={this.state.message}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between'
    },
    button: {
        flex: 1,
    }

});