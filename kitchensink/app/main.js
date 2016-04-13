import React, {
    Navigator,
    Component,
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

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { currentRoute: { name: 'index' } };
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
                onSelectPlugin={(plugin) => nav.push({ name: 'plugin', plugin }) }
                pluginList={PLUGINS.map((plugin) => { return { id: plugin.id, name: plugin.name } }) }
                />
        );

        if (route.name === 'plugin') {
            let list = PLUGINS.filter(({id}) => id === route.plugin.id);
            if (list.length !== 1) {
                ToastAndroid.show(`Could not find plugin ${pluginId}. \nIs it installed, has a corresponding file in ./app/plugins, and mentioned in package.json ? `, ToastAndroid.LONG);
            } else {
                let Plugin = list[0].module;
                routeComponent = (<Plugin></Plugin>);
            }
        }

        return (
            <ScrollView style={{ marginTop: 56 }}>
                {routeComponent}
            </ScrollView>
        );
    }

    render() {
        if (typeof this.props.plugin === 'string') {
            this.setState({ currentRoute: { name: 'plugin', plugin: this.props.plugin } });
        }
        return (
            <Navigator
                initialRoute={this.state.currentRoute}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                renderScene={(route, nav) => this.router(route, nav) }
                ref = {navigator => this.navigator = navigator}
                onWillFocus={route => { this.setState({ currentRoute: route }); } }
                navigationBar={
                    <Icon.ToolbarAndroid
                        style={styles.toolbar}
                        title={this.state.currentRoute.name !== 'index' ? this.state.currentRoute.plugin.name + ' Plugin' : 'Cordova plugins for ReactNative'}
                        titleColor="white"
                        navIconName={this.state.currentRoute.name === 'plugin' ? 'android-arrow-back' : 'android-menu'}
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
