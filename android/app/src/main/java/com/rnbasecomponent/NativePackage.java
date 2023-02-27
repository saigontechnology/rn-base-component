package com.rnbasecomponent;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class NativePackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
     return Arrays.<ViewManager>asList(
       new ShimmerManager()
     );
   }

   @Override
   public List<NativeModule> createNativeModules(
     ReactApplicationContext reactContext) {
     List<NativeModule> modules = new ArrayList<>();

     return modules;
   }
}
