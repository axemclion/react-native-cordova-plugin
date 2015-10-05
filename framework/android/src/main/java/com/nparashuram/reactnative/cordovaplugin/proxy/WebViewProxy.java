package com.nparashuram.reactnative.cordovaplugin.proxy;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.webkit.WebChromeClient;

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

public class WebViewProxy implements CordovaWebView {

    public static final String TAG = "WebViewProxy";

    @Override
    public void init(CordovaInterface cordova, List<PluginEntry> pluginEntries, CordovaPreferences preferences) {

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
        return null;
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
    }

    @Override
    public PluginManager getPluginManager() {
        return null;
    }

    @Override
    public CordovaWebViewEngine getEngine() {
        return null;
    }

    @Override
    public CordovaPreferences getPreferences() {
        return new CordovaPreferences();
    }

    @Override
    public ICordovaCookieManager getCookieManager() {
        return null;
    }

    @Override
    public String getUrl() {
        return null;
    }

    @Override
    public Context getContext() {
        return null;
    }

    @Override
    public void loadUrl(String url) {

    }

    @Override
    public Object postMessage(String id, Object data) {
        return null;
    }
}
