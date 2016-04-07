import React, {
    Navigator,
    Component,
    Text,
    View,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import Toolbar from './Toolbar';
import PluginList, {plugins} from './plugins';

class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoute: {}
        }
    }

    onBack(nav) {
        if (nav && nav.getCurrentRoutes().length > 1) {
            nav.pop();
            return true;
        }
        return false;
    }

    router(route, nav) {
        let RouteComponent = (
            <PluginList onSelectPlugin={(pluginName) => {
                nav.push({
                    name: "plugin",
                    pluginName
                })
            } }></PluginList>
        );

        if (route.name === 'plugin') {
            let Plugin = plugins[route.pluginName]
            if (typeof Plugin !== 'undefined') {
                RouteComponent = <Plugin></Plugin>
            } else {
                ToastAndroid.show('Could not find plugin ' + route.pluginName, ToastAndroid.SHORT);
            }
        }

        return (
            <View style={{ marginTop: 56, flex: 1 }}>
                {RouteComponent}
            </View>
        );
    }

    render() {
        return (
            <Navigator
                initialRoute={{}}
                configureScene={() => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, nav) => this.router(route, nav) }
                ref = {(navigator) => {
                    BackAndroid.addEventListener('hardwareBackPress', () => this.onBack(navigator));
                } }
                onWillFocus={(route) => {
                    this.setState({
                        currentRoute: route
                    });
                } }
                navigationBar={<Toolbar currentRoute={this.state.currentRoute}></Toolbar>}
                />
        );
    }
}

export default AppIndex;
