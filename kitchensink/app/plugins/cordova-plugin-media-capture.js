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
            result: null,
            error: null
        };
    }

    record(type) {
        this.setState({
            result: 'Starting Capture ' + type,
            error: null
        });
        Cordova.navigator.device.capture['capture' + type](
            result => this.setState({result}),
            error => this.setState({error})  
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Icon.Button style={styles.button} name="android-alert" onPress={() => this.record('Audio') }>
                        Audio
                    </Icon.Button>
                    <Icon.Button style={styles.button} name="help-circled" onPress={() => this.record('Video') }>
                        Video
                    </Icon.Button>
                    <Icon.Button style={styles.button} name="android-checkmark-circle" onPress={() => this.record('Image') }>
                        Image
                    </Icon.Button>
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