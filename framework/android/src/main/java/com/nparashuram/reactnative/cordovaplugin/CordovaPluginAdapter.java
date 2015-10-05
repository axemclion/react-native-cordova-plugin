package com.nparashuram.reactnative.cordovaplugin;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.nparashuram.reactnative.cordovaplugin.proxy.CordovaInterfaceProxy;
import com.nparashuram.reactnative.cordovaplugin.proxy.WebViewProxy;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginManager;

public class CordovaPluginAdapter extends ReactContextBaseJavaModule {

    PluginManager pluginManager;

    private static final String TAG = "CordovaPluginAdapter";

    public CordovaPluginAdapter(ReactApplicationContext reactContext, Activity mainReactActivity) {
        super(reactContext);

        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(reactContext);

        WebViewProxy webViewProxy = new WebViewProxy();
        CordovaInterfaceProxy cordovaInterface = new CordovaInterfaceProxy();
        cordovaInterface.setActivity(mainReactActivity);

        this.pluginManager = new PluginManager(webViewProxy, cordovaInterface, parser.getPluginEntries());

        this.pluginManager.init();
        this.pluginManager.exec("Camera", "takePicture", "1000", "[50,1,1,-1,-1,0,0,false,false,false,null,0]");
    }

    @Override
    public String getName() {
        return "CordovaPlugin";
    }

    @ReactMethod
    public void exec(String service, String action, String callbackId, String args) {
        LOG.d(TAG, String.format("Calling Cordova plugin %s.%s(%s) - %s", service, action, args, callbackId));
    }

}