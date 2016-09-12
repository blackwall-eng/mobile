package co.blackwall;

import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.*;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class AppPackage implements ReactPackage {

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(
                              ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new ErrorManager(reactContext));

    return modules;
  }
}
