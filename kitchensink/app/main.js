import React, {
    Navigator,
    Component,
    Text,
    View,
    BackAndroid,
} from 'react-native';

import Toolbar from './Toolbar';
import PluginList, {plugins} from './plugins';

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
            RouteComponent = (<PluginList onSelect={this.navigateToPlugin.bind(this) }></PluginList>);
        }
        return (
            <View style={{ marginTop: 56 }}>
                {RouteComponent}
            </View>
        );
    }

    handleToolbarIcon(type) {
        this.goBack();
    }

    render() {
        return (
            <Navigator
                initialRoute={{}}
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
