package io.cordova.reactnative;

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

public class MockWebViewImpl implements CordovaWebView {

    public static final String JS_MESSAGE_CORDOVA_WEBVIEW_PROXY = "CordovaWebViewProxy";
    private static final String JS_MESSAGE_CORDOVA_EVENT = "CordovaWebViewJSEvent";

    public static final String NOT_CORDOVA_ERR = "This is not a cordova app, so it does not implement the method asked for";

    private CordovaResourceApi resourceApi;
    private ReactApplicationContext context;
    private PluginManager pluginManager;
    private CordovaPreferences preferences;
    private boolean hasPausedEver;

    public MockWebViewImpl(ReactApplicationContext reactContext) {
        this.context = reactContext;
    }

    @Override
    public void init(CordovaInterface cordova, List<PluginEntry> pluginEntries, CordovaPreferences preferences) {
        this.preferences = preferences;
        this.pluginManager = new PluginManager(this, cordova, pluginEntries);
        this.pluginManager.init();
        this.resourceApi = new CordovaResourceApi(this.context, this.pluginManager);
    }

    @Override
    public void sendPluginResult(PluginResult cr, String callbackId) {
        WritableMap params = Arguments.createMap();
        params.putString("message", cr.getMessage());
        params.putInt("status", cr.getStatus());
        params.putInt("messageType", cr.getMessageType());
        params.putString("callbackId", callbackId);
        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(JS_MESSAGE_CORDOVA_WEBVIEW_PROXY, params);
    }

    @Override
    public void sendJavascript(String statememt) {
        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(JS_MESSAGE_CORDOVA_EVENT, statememt);
    }

    @Override
    public void handlePause(boolean keepRunning) {
        hasPausedEver = true;
        pluginManager.onPause(keepRunning);
    }

    @Override
    public void onNewIntent(Intent intent) {
        if (this.pluginManager != null) {
            this.pluginManager.onNewIntent(intent);
        }
    }

    @Override
    public void handleResume(boolean keepRunning) {
        this.pluginManager.onResume(keepRunning);
        // To be the same as other platforms, fire this event only when resumed after a "pause".
        if (hasPausedEver) {
            sendJavascriptEvent("resume");
        }
    }

    private void sendJavascriptEvent(String event) {
        this.sendJavascript("console.log(" + event + ")");
    }

    @Override
    public void handleStart() {
        pluginManager.onStart();
    }

    @Override
    public void handleStop() {
        pluginManager.onStop();
    }

    @Override
    public void handleDestroy() {
        this.pluginManager.onDestroy();
    }

    @Override
    public void showWebPage(String url, boolean openExternal, boolean clearHistory, Map<String, Object> params) {

    }

    @Override
    public Object postMessage(String id, Object data) {
        return pluginManager.postMessage(id, data);
    }

    @Override
    public boolean isInitialized() {
        return true;
    }

    @Override
    public View getView() {
        return null;
    }

    @Override
    public void loadUrlIntoView(String url, boolean recreatePlugins) {
        // NOT IMPLEMENTED
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
    public void setButtonPlumbedToJs(int keyCode, boolean override) {

    }

    @Override
    public boolean isButtonPlumbedToJs(int keyCode) {
        return false;
    }

    @Override
    public CordovaResourceApi getResourceApi() {
        return this.resourceApi;
    }

    @Override
    public PluginManager getPluginManager() {
        return this.pluginManager;
    }

    @Override
    public CordovaPreferences getPreferences() {
        return this.preferences;
    }

    @Override
    public Context getContext() {
        return this.context;
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
    public CordovaWebViewEngine getEngine() {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

    @Override
    public void loadUrl(String url) {
        throw new RuntimeException(NOT_CORDOVA_ERR);
    }

}
