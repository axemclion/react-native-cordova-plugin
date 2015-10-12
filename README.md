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
The next step would be to add Cordova Plugins in the project. Now that `react-native-cordova-plugin` package is added to __node_modules__ you can add packages using 

```
$ node node_modules\react-native-cordova-plugin add cordova-plugin-device
```

The plugins are downloaded from the npm registry and installed in the project's __node_modules__ folder. The files in each plugin are also converted to a form that can be consumed by the ReactNative project. 

### Part 3 - Using the Plugins
Currently, to use the plugin you have to use the `exec` interface. For the device plugin you can use `cordova.exec(console.log.bind(console), console.log.bind(console), 'Device', 'getDeviceInfo', []);`. This prints out the details about the device .
> Work in progress to expose the Javascript API that each plugins expose so that you can use a friendlier syntax. I plan to work on this in the next week.

## Contribute
Would love to have an contributions to this project, especially to get the iOS part working. Please send in a pull request (explaining what it does) and I can merge it in !! 