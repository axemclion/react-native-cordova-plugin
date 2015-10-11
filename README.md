# React-Native Cordova Plugin Adapter

A way to use Cordova plugins in React-Native Applications

## Why? 
The [Cordova plugin ecosystem](http://plugins.cordova.io) is diverse and rich. Many native device capabilities are already available as a plugin with a W3C like Javascript API in most cases. 
Using them to access native capabilities from React Native can be done using Cordova plugins without having to rewrite all those plugins.

## How? 

Navigate to the root of your ReactNative project and install npm install `react-native-cordova-plugin --save`. Then follow the steps below

### Step 1 - Setup
First, the Android or the iOS project needs to be set up so that it depends on this react-native-cordova-plugin adapter. 

#### Android

First, open the file __projectRoot\settings.gradle__ and replace `include ':app'` with the following

```
include ':cordovaplugin', ':app'
project(':cordovaplugin').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-cordova-plugin/framework/android')
```

Then, add the adapter as a dependency. Open the file __projectRoot/android/app/build.gradle__ and look for `dependencies` section.
Add a new line in the dependencies saying `compile project(':cordovaplugin')`

Finally, add `.addPackage(new io.cordova.reactnative.CordovaPluginPackage(this))` just below the line `.addPackage(new MainReactPackage())`
`

#### iOS
> Not yet implemented for iOS yet. 

### Part 2 - Adding Plugins
Once this react-native-cordova-plugin adapter is setup, you can start adding plugins to your project.

Currently the CLI for this project is not yet done. Open __lib\android-cli.js__ in this project and follow the manual steps. They will be automated soon.

### Part 3 - Using the Plugins