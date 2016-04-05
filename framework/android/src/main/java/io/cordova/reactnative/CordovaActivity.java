package io.cordova.reactnative;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

public class CordovaActivity extends Activity {

    private CordovaPluginPackage cordovaPluginPackage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        cordovaPluginPackage.setSavedInstanceState(savedInstanceState);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        cordovaPluginPackage.onActivityResult(requestCode, resultCode, intent);
    }

}
