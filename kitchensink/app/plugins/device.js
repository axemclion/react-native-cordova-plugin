import React, {
    Component,
    View,
    StyleSheet,
    Text
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

export default class Device extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' };
    }

    componentDidMount() {
        this.setState({ message: Cordova.device });
    }

    getInfo() {
        this.setState({ message: 'Refreshing data' })
        Cordova.device.getInfo((message) => this.setState({ message }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>The Cordova device plugin runs on start, so this information is already populated in the Cordova.device Object</Text>
                <Console message={this.state.message}/>
                <Icon.Button name='android-phone-portrait' onPress={() => this.getInfo() } style={{ justifyContent: 'center' }}>
                    Get Device Info
                </Icon.Button>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
});