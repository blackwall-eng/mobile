package co.blackwall;

import android.util.Base64;
import android.util.Log;
import com.bugsnag.android.Bugsnag;
import com.bugsnag.android.MetaData;
import com.bugsnag.android.Severity;
import com.facebook.react.bridge.*;

import java.io.File;
import java.io.InputStream;

public class ErrorManager extends ReactContextBaseJavaModule {
    public ErrorManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ErrorManager";
    }

    @ReactMethod
    public void identifyUser(String id, String name, String email) {
        Bugsnag.setUser(id, email, name);
    }

    @ReactMethod
    public void getSourceMaps(Callback callback) {
        try {
            InputStream inputStream = getReactApplicationContext().getAssets().open("sourcemap.js");
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer, 0, size);
            inputStream.close();
            String base64Content = Base64.encodeToString(buffer, Base64.NO_WRAP);
            callback.invoke(base64Content);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    @ReactMethod
    public void reportException(String title, ReadableArray details, int exceptionId, ReadableMap errorData, Callback callback) {
        Error error = new Error(title);
        error.setStackTrace(stackTraceToStackTraceElement(details));

        MetaData metaData = new MetaData();
        metaData.addToTab("Custom", "Stacktrace", stackTraceToString(details));

        ReadableMapKeySetIterator iterator = errorData.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            metaData.addToTab("Custom", key, errorData.getString(key));
        }
        Bugsnag.notify(title, title, stackTraceToStackTraceElement(details), Severity.ERROR, metaData);

        callback.invoke();
    }

    @ReactMethod
    public void leaveBreadcrumb(String message) {
      Bugsnag.leaveBreadcrumb(message);
    }

    private StackTraceElement[] stackTraceToStackTraceElement(ReadableArray stack) {
        StackTraceElement[] stackTraceElements = new StackTraceElement[stack.size()];
        for (int i = 0; i < stack.size(); i++) {
            ReadableMap frame = stack.getMap(i);
            String methodName = "none";
            if (frame.hasKey("methodName")) {
              methodName = frame.getString("methodName");
            }
            String fileName = "none";
            if (frame.hasKey("file")) {
              fileName = new File(frame.getString("file")).getName();
            }

            int lineNumber = 0;
            if (frame.hasKey("lineNumber")) {
              lineNumber = frame.getInt("lineNumber");
            }
            stackTraceElements[i] = new StackTraceElement(
                    "ReactJS",
                    methodName,
                    fileName,
                    lineNumber
            );
        }
        return stackTraceElements;
    }

    private String stackTraceToString(ReadableArray stack) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < stack.size(); i++) {
            ReadableMap frame = stack.getMap(i);
            if (frame.hasKey("methodName")) {
              stringBuilder.append(frame.getString("methodName"));
              stringBuilder.append("\n    ");
            }

            if (frame.hasKey("file")) {
              stringBuilder.append(new File(frame.getString("file")).getName());
              stringBuilder.append(":");
              stringBuilder.append(frame.getInt("lineNumber"));
              if (frame.hasKey("column") && !frame.isNull("column")) {
                  stringBuilder
                          .append(":")
                          .append(frame.getInt("column"));
              }
            }

            stringBuilder.append("\n");
        }
        return stringBuilder.toString();
    }

}
