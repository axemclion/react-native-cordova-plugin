import React, {
    Component,
    ToolbarAndroid,
    StyleSheet
} from 'react-native';

export default class Toolbar extends Component {
    getTitle(route) {
        if (route.name === 'plugin') {
            return 'Plugin : ' + route.pluginName;
        } else {
            return 'Plugin List';
        }
    }
    render() {
        return (
            <ToolbarAndroid
                style={styles.toolbar}
                title={this.getTitle(this.props.currentRoute) }
                titleColor="white"
                >
            </ToolbarAndroid>

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
