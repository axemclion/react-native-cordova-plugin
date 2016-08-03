import React, {Component} from 'react';
import {
    Navigator,
    Text,
    View,
    ScrollView,
    BackAndroid,
    ToastAndroid,
    StyleSheet
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

import PluginList from './PluginList';
import PLUGINS from './plugins';

function getPluginById(pluginId) {
    var list = PLUGINS.filter(({id}) => id === pluginId);
    if (list.length === 1) {
        return list[0];
    }
}

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: { name: props.pluginId ? 'plugin' : 'index', pluginId: props.pluginId }
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => this.goBack());
    }

    goBack() {
        let nav = this.navigator;
        if (nav && nav.getCurrentRoutes().length > 1) {
            nav.pop();
            return true;
        }
        return false;
    }

    router(route, nav) {
        let routeComponent = (
            <PluginList
                onSelectPlugin={(pluginId) => nav.push({ name: 'plugin', pluginId }) }
                pluginList={PLUGINS.map((plugin) => { return { id: plugin.id, name: plugin.name } }) }
                />
        );

        if (route.name === 'plugin') {
            let plugin = getPluginById(route.pluginId);
            if (plugin) {
                let Plugin = plugin.module;
                routeComponent = (<Plugin></Plugin>);
            } else {
                ToastAndroid.show(`Could not find plugin ${pluginId}. \nIs it installed, has a corresponding file in ./app/plugins, and mentioned in package.json ? `, ToastAndroid.LONG);
            }
        }

        return (
            <ScrollView style={{ marginTop: 56 }}>
                {routeComponent}
            </ScrollView>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={this.state.route}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                renderScene={(route, nav) => this.router(route, nav) }
                ref = {navigator => this.navigator = navigator}
                onWillFocus={route => { this.setState({ route }); } }
                navigationBar={
                    <Icon.ToolbarAndroid 
                        style={styles.toolbar}
                        title={this.state.route.name === 'index' ? 'Plugins' : getPluginById(this.state.route.pluginId).name + ' Plugin'}
                        titleColor="white"
                        navIconName={this.state.route.name === 'plugin' ? 'ios-backspace' : 'ios-menu'}
                        onIconClicked={() => this.navigator.resetTo({ name: 'index' }) }
                        />
                }
                />
        );
    }
}

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#673ab7',
        height: 56,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center'
    }
});
