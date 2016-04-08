import React, {
    Component,
    ToolbarAndroid,
    StyleSheet
} from 'react-native';

var Ionicons = require('react-native-vector-icons/Ionicons');

export default class Toolbar extends Component {
    getTitle(route) {
        if (route.name === 'plugin') {
            return route.plugin.name + ' Plugin';
        } else {
            return 'Plugin List';
        }
    }
    render() {
        return (
            <Ionicons.ToolbarAndroid
                style={styles.toolbar}
                title={this.getTitle(this.props.currentRoute) }
                titleColor="white"
                onIconClicked={this.props.onIconClicked}
                navIconName={this.props.currentRoute.name === 'plugin' ? 'android-arrow-back' : 'android-menu'}
                >
            </Ionicons.ToolbarAndroid>
        );
    }
}

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#673ab7',
        height: 50,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    }
});
