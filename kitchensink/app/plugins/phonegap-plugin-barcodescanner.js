import React, {
    Component,
    View,
    Text,
    Picker,
    TextInput,
    StyleSheet
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '', 
            error: '',
            encodeType: Cordova.cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
            encodeText: 'QR Code for this text'
        };
    }
    
     scan() {
        Cordova.cordova.plugins.barcodeScanner.scan(
            message => this.setState({message}),
            error => this.setState({error})
        );
    }
    
    encode() {
        Cordova.cordova.plugins.barcodeScanner.encode(
            this.state.encodeType,
            this.state.encodeText, 
            message => this.setState({message}),
            error => this.setState({error})
        );    
    }
    
    render() {
        return (
            <View style={{margin: 10}}>
                <View>
                    <Icon.Button onPress={this.scan.bind(this)} name="qr-scanner">
                        Scan Barcode/QR Code
                    </Icon.Button>
                </View>
                <Console message={this.state.message}/>
                <Text style={{textAlign: 'center', fontSize: 20}}>
                    Encode into QR Code
                </Text>
                <TextInput
                    value={this.state.encodeText}
                    onChangeText={encodeText => this.setState({encodeText})}
                />
                <Picker 
                    selectedValue={this.state.encodeType} 
                    onValueChange={encodeType => this.setState({encodeType})}> 
                    <Picker.Item label="Text" value={Cordova.cordova.plugins.barcodeScanner.Encode.TEXT_TYPE} /> 
                    <Picker.Item label="Email" value={Cordova.cordova.plugins.barcodeScanner.Encode.EMAIL_TYPE} /> 
                    <Picker.Item label="Phone" value={Cordova.cordova.plugins.barcodeScanner.Encode.PHONE_TYPE} /> 
                    <Picker.Item label="SMS" value={Cordova.cordova.plugins.barcodeScanner.Encode.SMS_TYPE} /> 
                </Picker>
                <Icon.Button onPress={this.encode.bind(this)} name="code-working">
                    Encode
                </Icon.Button>
            </View>
        )
    }
}