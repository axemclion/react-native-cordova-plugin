import React, {
    Component,
    View,
    Text,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Cordova = require('react-native-cordova-plugin');
const Icon = require('react-native-vector-icons/Ionicons');

var methods = [
    'getPreferredLanguage',
    'getLocaleName',
    'getDatePattern',
    'getDateNames',
    'getFirstDayOfWeek',
    'getNumberPattern',
    'isDayLightSavingsTime'
]

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {message: '', error: null};
    }
    
    callMethod(methodName) {
        Cordova.navigator.globalization[methodName](
            message=>this.setState({message}),
            error=>this.setState({error})
        );
    }
    
    renderGetMethods() {
        return methods.map(method => (
            <View key={method} style={styles.button}>
                <Icon.Button name='star' onPress={()=>this.callMethod(method)}>
                    {method}
                </Icon.Button>
            </View> 
        ));
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.renderGetMethods()}
                <View style={styles.button}>
                    <Icon.Button name='star' 
                        onPress={()=>Cordova.navigator.globalization.getCurrencyPattern('USD', message=>this.setState({message}), error=>this.setState({error}))}
                    >
                    getCurrencyPattern(USD)
                    </Icon.Button>
                </View>
                <View style={styles.button}>
                    <Icon.Button name='star' 
                        onPress={()=>Cordova.navigator.globalization.isDayLightSavingsTime(new Date(), message=>this.setState({message}), error=>this.setState({error}))}
                    >
                    isDayLightSavingsTime
                    </Icon.Button>
                </View> 
                <Console message={this.state} />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'stretch'
    }, 
    
    button: {
        margin: 10
    }
});