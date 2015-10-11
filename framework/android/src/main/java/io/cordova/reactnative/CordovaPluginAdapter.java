package io.cordova.reactnative;

import android.app.Activity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginManager;

import io.cordova.reactnative.mocks.CordovaInterfaceProxy;
import io.cordova.reactnative.mocks.WebViewMock;

public class CordovaPluginAdapter extends ReactContextBaseJavaModule {

    PluginManager pluginManager;

    private static final String TAG = "CordovaPluginAdapter";

    public CordovaPluginAdapter(ReactApplicationContext reactContext, Activity mainReactActivity) {
        super(reactContext);

        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(reactContext);

        CordovaInterfaceProxy cordova = new CordovaInterfaceProxy();
        cordova.setActivity(mainReactActivity);

        WebViewMock mockWebView = new WebViewMock(reactContext, mainReactActivity);
        mockWebView.init(cordova, parser.getPluginEntries(), new CordovaPreferences());

        this.pluginManager = mockWebView.getPluginManager();
    }

    @Override
    public String getName() {
        return TAG;
    }

    @ReactMethod
    public void exec(String service, String action, String callbackId, String args) {
        LOG.d(TAG, String.format("Calling Cordova plugin %s.%s(%s) - %s", service, action, args, callbackId));
        this.pluginManager.exec(service, action, callbackId, args);
    }

}