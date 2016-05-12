​
# React-Native Cordova Plugin Adapter

A way to use Cordova plugins in React-Native Applications

## Why?

The [Cordova plugin ecosystem](http://plugins.cordova.io) is diverse and rich. Many native device capabilities are already available as a plugin with a W3C like Javascript API in most cases.
Using them to access native capabilities from React Native can be done using Cordova plugins without having to rewrite all those plugins.

## How?

To start using Cordova Plugins in your ReactNative project, follow these steps

1. [Getting Started](#step-0---getting-started)
2. Setup your ReactNative project with this `react-native-cordova-plugin` module.
    - [For Android](#step-11-for-anrdoid)
    - For iOS (Not yet supported)
3. Add/Removing the required Cordova Plugin to the ReactNative project. ([link](#step-3---adding-cordova-plugin-to-reactnative-project))
4. Use the required Cordova Plugin in your ReactNative Javascript code. ([link](#step-4---using-the-plugins))

You can also check out the [example project](https://github.com/axemclion/react-native-cordova-plugin/tree/examples) in the `example` branch of this repository.


### Step 0 - Getting Started

First, Install this native module in your ReactNative project by running the following at the root of your ReactNative Project.

```
npm install react-native-cordova-plugin --save
```

### Step 1 - Setup the ReactNative project

As with all other React Native plugins, the integration experience is different for iOS and Android, so perform the next set of  setup steps depending on which platform(s) you are targetting.

#### Step 1.1 For Anrdoid

1. In __android/settings.gradle__ file, make the following changes

```gradle
  include ':app'
+ include ':cordovaplugin'
+ project(':cordovaplugin').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-cordova-plugin/framework/android')
```

2. In __android/app/build.gradle__, look for `dependencies` section and add the following line

```gradle
...
android {
  ...
}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile "com.android.support:appcompat-v7:23.0.1"
    compile "com.facebook.react:react-native:+"  // From node_modules    ...
+   compile project(':cordovaplugin')
}

```

3. In __android/app/src/main/java/com/appname/MainActivity.java__ (your main Android activity file), add a reference to __react-native-cordova-plugin__.
```diff
...
+  import io.cordova.reactnative.CordovaPluginPackage;
...
public class MainActivity extends ReactActivity {
     ...
     @Override
     protected List<ReactPackage> getPackages() {
         return Arrays.<ReactPackage>asList(
                 new MainReactPackage(),
+                cordovaPluginPackage = new CordovaPluginPackage(this)
         );
     }
+    private CordovaPluginPackage cordovaPluginPackage;
+    @Override
+    protected void onCreate(Bundle savedInstanceState) {
+        super.onCreate(savedInstanceState);
+        cordovaPluginPackage.setSavedInstanceState(savedInstanceState);
+    }
+    @Override
+    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
+        super.onActivityResult(requestCode, resultCode, intent);
+        cordovaPluginPackage.onActivityResult(requestCode, resultCode, intent);
+    }
}

```

### Step 3 - Adding Cordova Plugin to ReactNative project
To install a plugin, say the `cordova-plugin-camera` and `cordova-plugin-contacts`, run the following command from the root of your ReactNative project

```bash
$ node_modules/.bin/cordova-plugin add cordova-plugin-camera cordova-plugin-contacts
```

You can install plugins that require variables as well. Here we add the Cordova purchase plugin that handles In App Purchasing, supplying it the Billing Key of our Android application. You would replace the fake billing key (MIIBFJIEOF....) with your billing key (a very long string).

```bash
$ node_modules/.bin/cordova-plugin add cc.fovea.cordova.purchase --variable BILLING_KEY="MIIBFJIEOF...."
```

The __add__ command takes one of more Cordova plugins that can be added to the project. To remove a plugin, use
```bash
$ node_modules/.bin/cordova-plugin rm cordova-plugin-contacts
```

### Step 4 - Using the Plugins
In either __index.android.js__ or any other component, simply require this module using

```javascript
var Cordova = require('react-native-cordova-plugin');
```

In Cordova, all plugin methods are available on the `window` object. ReactNative does not run in a WebView and does not have a `window` object. Thus, all the methods and constants that a Cordova plugin defines are available in the `Cordova` object that was just required using the statement above.

```javascript
Cordova.navigator.camera.getPicture(onSuccess, onFail, {sourceType: Cordova.Camera.PictureSourceType.SAVEDPHOTOALBUM)});

// Listen to cordova-plugin-network-information plugin's events
Cordova.addEventListener('offline', onEvent);
```

There are more examples of using the plugins in the [examples](https://github.com/axemclion/react-native-cordova-plugin/blob/examples/) branch - look for files with plugin names.

## Older Versions
To run this plugin for older versions of ReactNative, use older versions published on npm

- 0.14 to 0.17: react-native-cordova-plugin@0.0.9
- 0.18 and above: Latest published on npm

To use CLI commands with react-native-cordova-plugin versions less than 1.0.0, replace `$ node_modules/.bin/cordova-plugin` with `$ node_modules/.bin/react-native-cordova-plugin`.

## Troubleshooting

Some JavaScript errors may be caused due to the way `cordova.js` is generated. You can try tto re-generate `cordova.js` using

```bash
$ node_modules/.bin/cordova-plugin repair
```

If that does not work, try cleaning all the cordova plugins using the following, and then add the plugins again
```bash
$ node_modules/.bin/cordova-plugin clean
```

If none of these work, please open an issue with a prefix __[QUESTION]__ in the title, and I could try helping you. It would help to open the issue with a reduced way to reproduce the error.
