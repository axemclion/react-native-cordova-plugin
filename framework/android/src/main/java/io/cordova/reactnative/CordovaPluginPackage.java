package io.cordova.reactnative;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CordovaPluginPackage implements ReactPackage {
    protected Bundle savedInstanceState;
    protected Activity activity;
    public CordovaPluginAdapter cordovaPluginAdapter;

    public CordovaPluginPackage(Activity reactActivity) {
        activity = reactActivity;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        cordovaPluginAdapter = new CordovaPluginAdapter(reactContext, activity, savedInstanceState);

        List<NativeModule> modules = new ArrayList<>();
        modules.add(this.cordovaPluginAdapter);
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    /**
     * Called by onCreate of the React App's MainActivity
     * @param savedInstanceState
     */
    public void setSavedInstanceState(Bundle savedInstanceState) {
        this.savedInstanceState = savedInstanceState;
    }

    /**
     * Called from the React App's MainActivity
     * @param requestCode
     * @param resultCode
     * @param intent
     */
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        this.cordovaPluginAdapter.onActivityResult(requestCode, resultCode, intent);
    }

}