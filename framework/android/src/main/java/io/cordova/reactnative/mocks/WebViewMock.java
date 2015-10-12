package io.cordova.reactnative.mocks;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaResourceApi;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewEngine;
import org.apache.cordova.ICordovaCookieManager;
import org.apache.cordova.PluginEntry;
import org.apache.cordova.PluginManager;
import org.apache.cordova.PluginResult;

import java.util.List;
import java.util.Map;

public class WebViewMock implements CordovaWebView {

    public static final String TAG = "CordovaWebViewProxy";
    public static final String NOT_CORDOVA_ERR = "This is not a cordova app, so it does not implement the method asked for";

    private CordovaResourceApi resourceApi;
    private Activity activity;
    private ReactApplicationContext context;
    private PluginManager pluginManager;
    private CordovaPreferences preferences;

    public WebViewMock(ReactApplicationContext reactContext, Activity mainReactActivity) {
        this.context = reactContext;
        this.activity = mainReactActivity;
    }

    @Override
    public void init(CordovaInterface cordova, List<PluginEntry> pluginEntries, CordovaPreferences preferences) {
        this.preferences = preferences;
        this.pluginManager = new PluginManager(this, cordova, pluginEntries);
        this.pluginManager.init();

        this.resourceApi = new CordovaResourceApi(this.context, this.pluginManager);

    }

    @Override
    public boolean isInitialized() {
        return false;
    }

    @Override
    public View getView() {
        return null;
    }

    @Override
    public void loadUrlIntoView(String url, boolean recreatePlugins) {

    }

    @Override
    public void stopLoading() {

    }

    @Override
    public boolean canGoBack() {
        return false;
    }

    @Override
    public void clearCache() {

    }

    @Override
    public void clearCache(boolean b) {

    }

    @Override
    public void clearHistory() {

    }

    @Override
    public boolean backHistory() {
        return false;
    }

    @Override
    public void handlePause(boolean keepRunning) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public void handleResume(boolean keepRunning) {

    }

    @Override
    public void handleStart() {

    }

    @Override
    public void handleStop() {

    }

    @Override
    public void handleDestroy() {

    }

    @Override
    public void sendJavascript(String statememt) {

    }

    @Override
    public void showWebPage(String url, boolean openExternal, boolean clearHistory, Map<String, Object> params) {

    }

    @Override
    public boolean isCustomViewShowing() {
        return false;
    }

    @Override
    public void showCustomView(View view, WebChromeClient.CustomViewCallback callback) {

    }

    @Override
    public void hideCustomView() {

    }

    @Override
    public CordovaResourceApi getResourceApi() {
        return this.resourceApi;
    }

    @Override
    public void setButtonPlumbedToJs(int keyCode, boolean override) {

    }

    @Override
    public boolean isButtonPlumbedToJs(int keyCode) {
        return false;
    }

    @Override
    public void sendPluginResult(PluginResult cr, String callbackId) {
        Log.d(TAG, String.format("Plugin result %s", cr));

        WritableMap params = Arguments.createMap();
        params.putString("message", cr.getMessage());
        params.putInt("status", cr.getStatus());
        params.putInt("messageType", cr.getMessageType());
        params.putString("callbackId", callbackId);

        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(TAG, params);
    }

    @Override
    public PluginManager getPluginManager() {
        return this.pluginManager;
    }

    @Override
    public CordovaWebViewEngine getEngine() {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

    @Override
    public CordovaPreferences getPreferences() {
        return this.preferences;
    }

    @Override
    public ICordovaCookieManager getCookieManager() {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

    @Override
    public String getUrl() {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

    @Override
    public Context getContext() {
        return this.context;
    }

    @Override
    public void loadUrl(String url) {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

    @Override
    public Object postMessage(String id, Object data) {
        return null;
    }
}
