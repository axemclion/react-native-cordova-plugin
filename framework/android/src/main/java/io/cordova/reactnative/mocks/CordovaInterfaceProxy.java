package io.cordova.reactnative.mocks;

import android.app.Activity;
import android.content.Intent;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class CordovaInterfaceProxy implements CordovaInterface {
    protected Activity activity;
    protected CordovaPlugin activityResultCallback;
    private ExecutorService threadPool;

    @Override
    public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {
        setActivityResultCallback(command);
        try {
            activity.startActivityForResult(intent, requestCode);
        } catch (RuntimeException e) { // E.g.: ActivityNotFoundException
            activityResultCallback = null;
            throw e;
        }
    }

    @Override
    public void setActivityResultCallback(CordovaPlugin plugin) {

    }

    @Override
    public Activity getActivity() {
        return this.activity;
    }

    @Override
    public Object onMessage(String id, Object data) {
        return null;
    }

    @Override
    public ExecutorService getThreadPool() {
        if (this.threadPool == null) {
            this.threadPool = Executors.newCachedThreadPool();
        }
        return this.threadPool;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }
}
