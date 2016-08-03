import React, {Component} from 'react';
import {AppRegistry} from 'react-native';

import AppIndex from './app/main';

class kitchensink extends Component {
    render() {
        return <AppIndex></AppIndex>
    }
}

AppRegistry.registerComponent('kitchensink', () => kitchensink);
