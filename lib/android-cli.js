console.log('The steps here have not yet been automated. Open this file instead and run the steps manually');

/**
To add a cordova plugin to a react native android project, the following steps need to be performed. They will be automted soon.

cd <root on React Native project>
npm install cordova-plugin-plugin_name

mkdir .\android\app\src\main\res\xml
touch .\android\app\src\main\res\xml\config.xml
# In the config.xml, add the following <?xml version='1.0' encoding='utf-8'?><widget id="io.cordova.hellocordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0"></widget>

mkdir -p .\node_modules\react-native-cordova-plugin\plugins\android

# Look at each plugin's plugin.xml and do the following

# Update .\android\app\src\main\res\AndroidManifest.xml with permissions in plugin.xml
# Update .\android\app\src\main\res\xml\config.xml with the feature tags
# Copy all java sources specified in plugin.xml to the .\plugins\android, with the correct path
cp
**/