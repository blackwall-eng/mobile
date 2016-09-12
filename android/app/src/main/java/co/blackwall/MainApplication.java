package co.blackwall;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.BV.LinearGradient.LinearGradientPackage;

import java.util.Arrays;
import java.util.List;

import com.bugsnag.android.*;
import Constants.java;

public class MainApplication extends Application implements ReactApplication {

  @Override
  public onCreate(Bundle bundle) {
    super.onCreate(bundle);
    Configuration config = new Configuration(Constants.BUGSNAG_KEY);
    config.setPersistUserBetweenSessions(true);
    Bugsnag.init(this, config);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new LinearGradientPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
