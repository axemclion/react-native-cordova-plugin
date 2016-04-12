# React Native Cordova Plugin - Kitchen Example

## Steps to run the sample app

1. Install `node_modules` using `npm install`
2. The `npm install` step above also runs a `postInstall` script that installs the required Cordova plugins
3. Run the application using `npm run android`. Ensure that you have a device connected, or have the Android emulator running.

## Adding a new plugin to the list

1. Add the plugin UI/React Component in `./app/plugins`, with the same name as the plugin id. 
2. Add the plugin as a object (with version) in the `plugins` key in `package.json`