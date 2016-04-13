import React, {
    Component,
    ListView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

export default class extends Component {
    renderRow(plugin) {
        return (
            <View>
                <TouchableHighlight onPress={e => this.props.onSelectPlugin(plugin.id) }>
                    <View style={styles.row}>
                        <View style={styles.iconContent}>
                            <Icon name={DEFAULT_ICONS[plugin.id] || 'android-' + plugin.name.toLowerCase() } size={20} style={styles.icon}/>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.rowTitleText}>{plugin.name}</Text>
                            <Text style={styles.rowDetailText}>{plugin.id}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
            </View >
        );
    }

    render() {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        return (
            <View style={styles.container}>
                <ListView
                    style={styles.listView}
                    dataSource={ds.cloneWithRows(this.props.pluginList) }
                    renderRow={(row) => this.renderRow(row) }
                    />
            </View>
        );
    }
}

const DEFAULT_ICONS = {
    'cordova-plugin-dialogs': 'ios-list',
    'cordova-plugin-device': 'android-phone-portrait',
    'cordova-plugin-network-information': 'network',
    'ionic-plugin-keyboard': 'key',
    'cordova-plugin-statusbar': 'minus-round',
    'cordova-plugin-globalization' : 'android-globe'
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        backgroundColor: '#eeeeee',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textContent: {
        alignSelf: 'center',
    },
    iconContent: {
        alignSelf: 'center',
    },
    icon: {
        textAlign: 'center',
        marginRight: 20,
        width: 20,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
    },
    rowTitleText: {
        fontSize: 17,
        fontWeight: '500',
    },
    rowDetailText: {
        fontSize: 15,
        color: '#888888',
        lineHeight: 20,
    },
});