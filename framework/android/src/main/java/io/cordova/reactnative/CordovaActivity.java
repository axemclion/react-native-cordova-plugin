package io.cordova.reactnative;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import org.apache.cordova.CordovaInterfaceImpl;
import org.apache.cordova.LOG;

public class CordovaActivity extends Activity {

    private static final String TAG = "CORDOVA_ACTIVITY";
    public CordovaPluginPackage cordovaPluginPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        cordovaPluginPackage = new CordovaPluginPackage(this, savedInstanceState);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        CordovaInterfaceImpl cordovaInterface = cordovaPluginPackage.cordovaPluginAdapter.cordovaInterface;
        LOG.d(TAG, "Incoming Result. Request code = " + requestCode);
        super.onActivityResult(requestCode, resultCode, intent);
        cordovaInterface.onActivityResult(requestCode, resultCode, intent);
    }

}
