import React, {
    Navigator,
    Component,
    Text,
    View,
    ScrollView,
    BackAndroid,
} from 'react-native';

import Toolbar from './Toolbar';
import PluginSelector from './PluginSelector';
import PluginList from './PluginList';

class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: {}
        }
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

    navigateToPlugin(plugin) {
        let nav = this.navigator;
        nav && nav.push({ name: 'plugin', plugin });
    }

    router(route, nav) {
        let RouteComponent = '';
        if (route.name === 'plugin') {
            let Plugin = route.plugin.module;
            RouteComponent = (<Plugin></Plugin>);
        } else {
            RouteComponent = (<PluginSelector onSelect={this.navigateToPlugin.bind(this) }></PluginSelector>);
        }
        return (
            <ScrollView style={{ marginTop: 56 }}>
                {RouteComponent}
            </ScrollView>
        );
    }

    handleToolbarIcon(type) {
        this.navigator.resetTo({ name: 'index' });
    }

    render() {
        let initialRoute = { name: 'index' };
        if (typeof this.props.plugin === 'string') {
            initialRoute = { name: 'plugin', plugin: PluginList.findById(this.props.plugin) }
        }
        return (
            <Navigator
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.HorizontalSwipeJump}
                renderScene={(route, nav) => this.router(route, nav) }
                ref = {(navigator) => {
                    this.navigator = navigator;
                } }
                onWillFocus={(route) => {
                    this.setState({
                        currentRoute: route
                    });
                } }
                navigationBar={
                    <Toolbar
                        currentRoute={this.state.currentRoute}
                        onIconClicked={this.handleToolbarIcon.bind(this) }>
                    </Toolbar>
                }
                />
        );
    }
}

export default AppIndex;
