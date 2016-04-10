/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component
} from 'react-native';

import AppIndex from './app/main';

class kitchensink extends Component {
    render() {
        return <AppIndex plugin='cordova-plugin-contacts'></AppIndex>
    }
}

AppRegistry.registerComponent('kitchensink', () => kitchensink);
