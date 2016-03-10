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

Open the main react package, usually called __MainActivity.java__ in the __projectRoot/android/app/src/main/java/com/appName/__ folder.

For RN >= 0.18:

```diff
+import io.cordova.reactnative.CordovaPluginPackage; // add to top of file
// ...
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
-            new MainReactPackage()
+            new MainReactPackage(), // <-- add comma here
+            new CordovaPluginPackage(this, null) // <-- add the package (`null` is for initial bundle/savedInstanceState value)
        );
    }
```

For RN < 0.18:

- Make the class extend _io.cordova.reactnative.CordovaActivity_ instead of _Activity_. For example, replace the line that says `public class MainActivity extends Activity implements DefaultHardwareBa...` with `public class MainActivity extends io.cordova.reactnative.CordovaActivity implements DefaultHardware...`
- Add `.addPackage(super.cordovaPluginPackage)` just below the line `.addPackage(new MainReactPackage())`

> If you want to continue extending `Activity` and not change it to `CordovaActivity`, just look at the `io.cordova.reactnative.CordovaActivity.java` and add the methods and field memebers as in the file.

#### iOS
> Not yet implemented for iOS yet.

### Part 2 - Adding Plugins
The next step would be to add Cordova Plugins in the project. Now that `react-native-cordova-plugin` package is added to __node_modules__ you can add packages using

```
$ node node_modules\.bin\cordova-plugin add cordova-plugin-device
```

The plugins are downloaded from the npm registry and installed in the project's __node_modules__ folder. The files in each plugin are also converted to a form that can be consumed by the ReactNative project.

### Part 3 - Using the Plugins
To use a plugin, simply require `var cordova = require('react-native-cordova-plugin');`. You can then start using the Cordova plugin APIs using `cordova.device.getInfo(console.log.bind(console), console.log.bind(console));`.

This [example file](https://gist.github.com/axemclion/b30bdfe991e509851705) shows a sample application.

## Contribute
Would love to have an contributions to this project, especially to get the iOS part working. Please send in a pull request (explaining what it does) and I can merge it in !!
