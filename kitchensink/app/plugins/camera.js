import React, {
    Component,
    View,
    Text
} from 'react-native';

var Cordova = require('react-native-cordova-plugin');

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = { result: 'Not called yet' };

        Cordova.navigator.camera.getPicture((res) => {
            this.setState({ result: res });
        }, (err) => {
            this.setState({ result: err });
        });
    }

    render() {
        return (
            <Text>Camera Plugin</Text>
        )
    }
}