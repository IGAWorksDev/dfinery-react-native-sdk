package com.igaworks.dfineryreactnativesdk;

import android.app.Activity;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.bridge.WritableMap;
import com.igaworks.dfinery.Dfinery;
import com.igaworks.dfinery.DfineryBridge;
import com.igaworks.dfinery.DfineryProperties;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class DfineryReactNativeSdkModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String TAG = "dfn_DfineryReactNativeSdk";
    private final DfineryBridge dfineryBridge = DfineryBridge.getInstance();
    private static final String DFINERY = "Dfinery";
    private static final String DFINERY_PROPERTIES = "DfineryProperties";
    private static final String DFINERY_CONFIG = "DfineryConfig";

    public DfineryReactNativeSdkModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public void onHostResume() {
        Log.i(TAG, "onHostResume");
        startSession();
    }

    @Override
    public void onHostPause() {
        Log.i(TAG, "onHostPause");
        endSession();
    }

    @Override
    public void onHostDestroy() {
        Log.i(TAG, "onHostDestroy");
    }

    @Override
    public void initialize() {
        super.initialize();
        Log.i(TAG, "initialize");
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void invalidate() {
        super.invalidate();
        Log.i(TAG, "invalidate");
        getReactApplicationContext().removeLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "DfineryReactNativeSdk";
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void init(String serviceId) {
        processInit(serviceId, null);
    }

    @ReactMethod
    public void initWithConfig(String serviceId, ReadableMap config) {
        processInit(serviceId, config);
    }

    private void processInit(String serviceId, ReadableMap config) {
        if (config == null) {
            dfineryBridge.init(getReactApplicationContext(), serviceId);
        } else {
            dfineryBridge.init(getReactApplicationContext(), serviceId, convertReadableMapToJson(config).toString());
        }
    }

    private void startSession() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        dfineryBridge.startSession(currentActivity);
        dfineryBridge.handlePushNotificationOpened(currentActivity);
    }

    private void endSession() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        dfineryBridge.endSession(currentActivity);
    }

    @ReactMethod
    public void logEvent(String eventName, ReadableMap properties) {
        if (properties == null) {
            Dfinery.getInstance().logEvent(eventName);
        } else {
            Dfinery.getInstance().logEvent(eventName, convertReadableMapToJson(properties));
        }
    }

    @ReactMethod
    public void enableSDK() {
        Dfinery.getInstance().enableSDK();
    }

    @ReactMethod
    public void disableSDK() {
        Dfinery.getInstance().disableSDK();
    }

    @ReactMethod
    public void setUserProfileBoolean(String key, Boolean value) {
        DfineryProperties.setUserProfile(key, value);
    }

    @ReactMethod
    public void setUserProfileDouble(String key, Double value) {
        DfineryProperties.setUserProfile(key, value);
    }

    @ReactMethod
    public void setUserProfileLong(String key, Double value) {
        DfineryProperties.setUserProfile(key, value);
    }

    @ReactMethod
    public void setUserProfileString(String key, String value) {
        DfineryProperties.setUserProfile(key, value);
    }

    @ReactMethod
    public void setUserProfileArray(String key, ReadableArray value) {
        if (value == null) {
            Log.e(TAG, "setUserProfileArray() value is null");
            return;
        }
        DfineryProperties.setUserProfile(key, convertReadableArrayToJson(value));
    }

    @ReactMethod
    public void setUserProfiles(ReadableMap values) {
        if (values == null) {
            Log.e(TAG, "setUserProfiles() values is null");
            return;
        }
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "setUserProfiles");
            JSONObject methodParam = new JSONObject();
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_1, convertReadableMapToJson(values));
            root.put(DfineryBridge.KEY_OBJECT_METHOD_PARAM, methodParam);
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void setIdentity(String key, String value) {
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "setIdentity");
            JSONObject methodParam = new JSONObject();
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_1, key);
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_2, value);
            root.put(DfineryBridge.KEY_OBJECT_METHOD_PARAM, methodParam);
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void setIdentities(ReadableMap values) {
        if (values == null) {
            Log.d(TAG, "values is null");
            return;
        }
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "setIdentities");
            JSONObject methodParam = new JSONObject();
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_1, convertReadableMapToJson(values));
            root.put(DfineryBridge.KEY_OBJECT_METHOD_PARAM, methodParam);
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void resetIdentity() {
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "resetIdentity");
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void setGoogleAdvertisingId(String googleAdvertisingId, Boolean isLimitAdTrackingEnabled) {
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "setGoogleAdvertisingId");
            JSONObject methodParam = new JSONObject();
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_1, googleAdvertisingId);
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_2, isLimitAdTrackingEnabled);
            root.put(DfineryBridge.KEY_OBJECT_METHOD_PARAM, methodParam);
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void getGoogleAdvertisingId(Promise promise) {
        dfineryBridge.getGoogleAdvertisingId(getReactApplicationContext(), new DfineryBridge.DfineryGetGoogleAdvertisingIdCallback() {
            @Override
            public void onCallback(String googleAdvertisingId, boolean isLimitAdTrackingEnabled) {
                HashMap<Object, Object> map = new HashMap<>();
                map.put("googleAdvertisingId", googleAdvertisingId);
                map.put("isLimitAdTrackingEnabled", isLimitAdTrackingEnabled);
                promise.resolve(convertToReadableMap(map));
            }
        });
    }

    @ReactMethod
    public void setPushToken(String pushToken) {
        JSONObject root = new JSONObject();
        try {
            root.put(DfineryBridge.KEY_STRING_CLASS_NAME, DFINERY_PROPERTIES);
            root.put(DfineryBridge.KEY_STRING_METHOD_NAME, "setPushToken");
            JSONObject methodParam = new JSONObject();
            methodParam.put(DfineryBridge.KEY_ANY_METHOD_ARGS_1, pushToken);
            root.put(DfineryBridge.KEY_OBJECT_METHOD_PARAM, methodParam);
            String result = dfineryBridge.invoke(root);
        } catch (JSONException e) {
            Log.w(TAG, e);
        }
    }

    @ReactMethod
    public void getPushToken(Promise promise) {
        dfineryBridge.getPushToken(new DfineryBridge.DfineryBridgeCallback() {
            @Override
            public void onCallback(String token) {
                promise.resolve(token);
            }
        });
    }

    @ReactMethod
    public void createNotificationChannel(ReadableMap properties) {
        if (properties == null) {
            Log.d(TAG, "properties is null");
            return;
        }
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        JSONObject jsonObject = convertReadableMapToJson(properties);
        dfineryBridge.createNotificationChannel(currentActivity, jsonObject.toString());
    }

    @ReactMethod
    public void deleteNotificationChannel(String channelId) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        dfineryBridge.deleteNotificationChannel(currentActivity, channelId);
    }

    @ReactMethod
    public void createNotificationChannelGroup(ReadableMap properties) {
        if (properties == null) {
            Log.d(TAG, "properties is null");
            return;
        }
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        JSONObject jsonObject = convertReadableMapToJson(properties);
        dfineryBridge.createNotificationChannelGroup(currentActivity, jsonObject.toString());
    }

    @ReactMethod
    public void deleteNotificationChannelGroup(String channelGroupId) {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Log.d(TAG, "currentActivity is null");
            return;
        }
        dfineryBridge.deleteNotificationChannelGroup(currentActivity, channelGroupId);
    }

    private JSONObject convertReadableMapToJson(@NonNull ReadableMap readableMap) {
        JSONObject jsonObject = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            try {
                switch (readableMap.getType(key)) {
                    case Null:
                        jsonObject.put(key, JSONObject.NULL);
                        break;
                    case Boolean:
                        jsonObject.put(key, readableMap.getBoolean(key));
                        break;
                    case Number:
                        Dynamic dynamicValue = readableMap.getDynamic(key);
                        double numberValue = dynamicValue.asDouble();
                        if (numberValue == (long) numberValue) {
                            jsonObject.put(key, (long) numberValue);
                        } else {
                            jsonObject.put(key, Double.valueOf(numberValue));
                        }
                        break;
                    case String:
                        jsonObject.put(key, readableMap.getString(key));
                        break;
                    case Array:
                        jsonObject.put(key, convertReadableArrayToJson(readableMap.getArray(key)));
                        break;
                    default:
                        Log.d(TAG, "Could not convert object with key: " + key + ".");
                }
            } catch (Exception e) {
                Log.w(TAG, e);
            }
        }
        return jsonObject;
    }

    private JSONArray convertReadableArrayToJson(ReadableArray readableArray) {
        JSONArray jsonArray = new JSONArray();
        if (readableArray == null) {
            return jsonArray;
        }
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType type = readableArray.getType(i);
            try {
                switch (type) {
                    case Null:
                        jsonArray.put(JSONObject.NULL);
                        break;
                    case Number:
                        Dynamic dynamicValue = readableArray.getDynamic(i);
                        double numberValue = dynamicValue.asDouble();
                        if (numberValue == (long) numberValue) {
                            jsonArray.put((long) numberValue);
                        } else {
                            jsonArray.put(Double.valueOf(numberValue));
                        }
                        jsonArray.put(readableArray.getDouble(i));
                        break;
                    case String:
                        jsonArray.put(readableArray.getString(i));
                        break;
                    case Map:
                        jsonArray.put(convertReadableMapToJson(readableArray.getMap(i)));
                        break;
                }
            } catch (Exception e) {
                Log.e(TAG, e.toString());
            }
        }
        return jsonArray;
    }

    private ReadableMap convertToReadableMap(HashMap<Object, Object> hashMap) {
        WritableMap writableMap = Arguments.createMap();
        for (Map.Entry<Object, Object> entry : hashMap.entrySet()) {
            Object key = entry.getKey();
            Object value = entry.getValue();

            if (value instanceof String) {
                writableMap.putString(key.toString(), (String) value);
            } else if (value instanceof Integer || value instanceof Long) {
                writableMap.putInt(key.toString(), (int) value);
            } else if (value instanceof Boolean) {
                writableMap.putBoolean(key.toString(), (Boolean) value);
            } else if (value instanceof Double || value instanceof Float) {
                writableMap.putDouble(key.toString(), (double) value);
            } else {
                writableMap.putString(key.toString(), value.toString());
            }
        }
        return writableMap;
    }
}
