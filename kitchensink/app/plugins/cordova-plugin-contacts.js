import React, {Component} from 'react';
import  {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

import Console from './../Console';

const Icon = require('react-native-vector-icons/Ionicons');
const Cordova = require('react-native-cordova-plugin');

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            searchResults : 'Start typing to search for contacts'
        };
    }

    pickContact() {
        this.setState({ result: 'Picking Contacts' })
        Cordova.navigator.contacts.pickContact(
            (result) => this.setState({ result }),
            (err) => this.setState({ result: err })
        );
    }

    findContact(query) {
        var options = new Cordova.ContactFindOptions();
        options.filter = query;
        options.multiple = true;
        Cordova.navigator.contacts.find(
            ["*"],
            result => this.setState({result, searchResults: result.length + ' results found. Scroll down for results'}),
            (err) => this.setState({ result: err }),
            options
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Search Contacts"
                    onChangeText={query => this.findContact(query)}
                    />
                <Text style={{textAlign: 'right'}}>{this.state.searchResults}</Text>
                
                <Icon.Button name="android-contract" onPress={() => this.pickContact()}>
                    Pick a contact
                </Icon.Button>
                
                <View style={styles.separator} />
                <Console message = {this.state.result}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginTop: 20,
        marginBottom: 20
    },
});