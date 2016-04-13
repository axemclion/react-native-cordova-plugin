import React, {
    Text,
    View,
    StyleSheet,
    Component
}
from 'react-native';

function renderKeyValue(k, v) {
    var result = '';
    switch (v === null ? 'null' : typeof v) {
        case 'object':
            if (Array.isArray(v)) {
                result = (<View style={styles.col}>
                    <Text style={styles.label}>{v.length} items (array)</Text>
                    {v.map((a, i) => renderKeyValue(i + 1, a)) }
                </View>);
            } else {
                result = (
                    <View style={styles.col}>
                        <Text style={styles.label}>(object)</Text>
                        { Object.keys(v).map(key => renderKeyValue(key, v[key])) }
                    </View>
                );
            }
            break;
        case 'null':
            result = (<Text style={styles.special}>NULL</Text>);
            break;
        case 'undefined':
            result = (<Text style={styles.special}>UNDEFINED</Text>);
            break;
        case 'number':
        case 'boolean':
        case 'string':
        case 'undefined':
        default:
            result = (<Text style={styles.value}>{v}</Text>);
    }
    return (
        <View style={styles.row} key={k}>
            <Text style={styles.key}>{k}</Text>
            {result}
        </View>
    );
}
export default class Console extends Component {
    render() {
        return <View style={styles.container}>
            {renderKeyValue('', this.props.message) }
        </View>
    }
}

var styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    key: {
        color: 'blue',
        padding: 2,
        margin: 1,
        borderWidth: 1
    },
    value: {
        padding: 2,
        margin: 1,
        borderWidth: 1,
    },
    label: {
        color: '#CECECE',
    }, 
    special: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'center'
    }
});