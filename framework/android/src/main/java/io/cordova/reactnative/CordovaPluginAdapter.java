package io.cordova.reactnative;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.CordovaInterfaceImpl;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginEntry;
import org.apache.cordova.PluginManager;

import java.util.ArrayList;

public class CordovaPluginAdapter extends ReactContextBaseJavaModule {

    PluginManager pluginManager;

    private static final String TAG = "CordovaPluginAdapter";
    private CordovaPreferences preferences;
    private ArrayList<PluginEntry> pluginEntries;
    public CordovaInterfaceImpl cordovaInterface;

    public CordovaPluginAdapter(ReactApplicationContext reactContext, Activity mainReactActivity, Bundle savedInstanceState) {
        super(reactContext);
        loadConfig(reactContext, mainReactActivity);
        cordovaInterface = new CordovaInterfaceImpl(mainReactActivity);
        if (savedInstanceState != null) {
            cordovaInterface.restoreInstanceState(savedInstanceState);
        }

        MockWebViewImpl mockWebView = new MockWebViewImpl(reactContext);
        mockWebView.init(cordovaInterface, pluginEntries, preferences);

        this.pluginManager = mockWebView.getPluginManager();
        cordovaInterface.onCordovaInit(this.pluginManager);
    }

    @Override
    public String getName() {
        return TAG;
    }

    /**
     * Exposed to the Javascript, this is the same exec call that is available to a Cordova plugin
     *
     * @param service
     * @param action
     * @param callbackId
     * @param args
     */
    @ReactMethod
    public void exec(String service, String action, String callbackId, String args) {
        LOG.d(TAG, String.format("Calling Cordova plugin %s.%s(%s) - %s", service, action, args, callbackId));
        this.pluginManager.exec(service, action, callbackId, args);
    }

    /**
     * Implementation called from the Activity. This is called when a plugin (like Camera) starts a
     * new activity then calls this with the result. Cordova callbacks are executed via this
     *
     * @param requestCode
     * @param resultCode
     * @param intent
     */
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        this.cordovaInterface.onActivityResult(requestCode, resultCode, intent);
    }

    /**
     * Reads config.xml and loads all the plugin classes
     *
     * @param context
     * @param activity
     */
    public void loadConfig(Context context, Activity activity) {
        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(context);
        preferences = parser.getPreferences();
        preferences.setPreferencesBundle(activity.getIntent().getExtras());
        pluginEntries = parser.getPluginEntries();
        LOG.d(TAG, String.format("Found %d plugins", pluginEntries.size()));
    }
}