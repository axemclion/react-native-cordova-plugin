package io.cordova.reactnative;

import android.app.Activity;
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
    protected final Bundle savedInstanceState;
    protected Activity activity;
    protected CordovaPluginAdapter cordovaPluginAdapter;

    public CordovaPluginPackage(Activity reactActivity, Bundle bundle) {
        savedInstanceState = bundle;
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
}