import React, {
    Component,
    ListView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

const plugins = {
    'camera': require('./camera').default,
    'contacts': require('./contacts').default
};

export default class PluginList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(Object.keys(plugins)),
        }
    }

    renderRow(rowData) {
        return (
            <View>
                <TouchableHighlight onPress={(e) => this.props.onSelectPlugin(rowData) }>
                    <Text>{rowData}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={(row) => this.renderRow(row) }
                renderHeader={() => <Text>List of plugins</Text>}
                />
        );
    }
}


var styles = StyleSheet.create({
    listView: {
        paddingLeft: 30
    },
});


export {plugins};