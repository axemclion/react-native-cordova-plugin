import React, {
    Component,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

const Cordova = require('react-native-cordova-plugin');

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = { result: 'Not called yet' };
    }

    takePicture() {
        Cordova.navigator.camera.getPicture((img) => this.setState({ result: JSON.stringify(img) }), (img) => this.setState({ result: JSON.stringify(img) }));
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.takePicture.bind(this) }>
                    <Text>Take a picture</Text>
                </TouchableHighlight>
                <Text>
                    {this.state.result}
                </Text>
            </View>
        )
    }
}