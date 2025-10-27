import { NativeModules, Platform } from 'react-native';
import { DFGetGoogleAdvertisingIdCallback } from './callbacks';

const { DfineryReactNativeSdk: bridge } = NativeModules;

export default class Dfinery {
  static init(serviceId) {
    bridge.init(serviceId);
  }

  static initWithConfig(serviceId, config) {
    bridge.initWithConfig(serviceId, config);
  }

  static logEvent(eventName, properties) {
    if (properties) {
      convertDatesToIsoString(properties);
      bridge.logEvent(eventName, properties);
    } else {
      bridge.logEvent(eventName, null);
    }
  }

  static enableSDK() {
    bridge.enableSDK();
  }

  static disableSDK() {
    bridge.disableSDK();
  }

  static setUserProfile(key, value) {
    if (Platform.OS === 'android') {
      if (typeof value === 'number') {
        if (value % 1 === 0) {
          bridge.setUserProfileLong(key, value);
        } else {
          bridge.setUserProfileDouble(key, value);
        }
      } else if (typeof value === 'boolean') {
        bridge.setUserProfileBoolean(key, value);
      } else if (typeof value === 'string') {
        bridge.setUserProfileString(key, value);
      } else if (Array.isArray(value)) {
        bridge.setUserProfileArray(key, value);
      } else if (value instanceof Date && !isNaN(value.getTime())) {
        bridge.setUserProfileString(key, value.toISOString());
      }
    } else if (Platform.OS === 'ios') {
      if (value instanceof Date && !isNaN(value.getTime())) {
        bridge.setUserProfile(key, value.toISOString());
      } else {
        bridge.setUserProfile(key, value);
      }
    }
  }

  static setUserProfiles(values) {
    const converted = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        if (value instanceof Date && !isNaN(value.getTime())) {
          converted[key] = value.toISOString();
        } else {
          converted[key] = value;
        }
      }
    }
    bridge.setUserProfiles(converted);
  }

  static setIdentity(key, value) {
    bridge.setIdentity(key, value);
  }

  static setIdentities(values) {
    bridge.setIdentities(values);
  }

  static resetIdentity() {
    bridge.resetIdentity();
  }

  static setGoogleAdvertisingId(googleAdvertisingId, isLimitAdTrackingEnabled) {
    if (Platform.OS === 'android') {
      bridge.setGoogleAdvertisingId(googleAdvertisingId, isLimitAdTrackingEnabled);
    }
  }

  static async getGoogleAdvertisingId() {
    if (Platform.OS === 'android') {
      try {
        const result = await bridge.getGoogleAdvertisingId();
        if (result) {
          const googleAdvertisingId = result.googleAdvertisingId;
          const isLimitAdTrackingEnabled = result.isLimitAdTrackingEnabled;
          return new DFGetGoogleAdvertisingIdCallback(googleAdvertisingId, isLimitAdTrackingEnabled);
        }
        return null;
      } catch (error) {
        console.error('Error fetching Google Advertising ID:', error);
        return null;
      }
    } else {
      return null;
    }
  }

  static setPushToken(pushToken) {
    bridge.setPushToken(pushToken);
  }

  static getPushToken() {
    return bridge.getPushToken();
  }

  static createNotificationChannel(properties) {
    if (Platform.OS === 'android') {
      bridge.createNotificationChannel(properties);
    }
  }

  static deleteNotificationChannel(channelId) {
    if (Platform.OS === 'android') {
      bridge.deleteNotificationChannel(channelId);
    }
  }

  static createNotificationChannelGroup(properties) {
    if (Platform.OS === 'android') {
      bridge.createNotificationChannelGroup(properties);
    }
  }

  static deleteNotificationChannelGroup(channelGroupId) {
    if (Platform.OS === 'android') {
      bridge.deleteNotificationChannelGroup(channelGroupId);
    }
  }
}

function convertDatesToIsoString(map) {
  Object.keys(map).forEach(key => {
    const value = map[key];

    if (value instanceof Date) {
      // DateTime 값을 ISO8601 문자열로 변환
      map[key] = value.toISOString();
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 중첩된 Map 처리
      convertDatesToIsoString(value);
    } else if (Array.isArray(value)) {
      // 리스트 내부에 Map이 있는 경우 처리
      value.forEach((item, index) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          convertDatesToIsoString(item);
        } else if (item instanceof Date) {
          value[index] = item.toISOString();
        }
      });
    }
  });
} 

export {
  DFEvent,
  DFEventProperty,
  DFUserProfile,
  DFGender,
  DFIdentity,
  DFConfig,
  DFAndroidLogLevel,
  DFAndroidNotificationChannelProperty,
  DFAndroidNotificationChannelGroupProperty,
  DFAndroidNotificationChannelImportance,
  DFAndroidNotificationChannelVisibility,
} from './enums';

export { DFGetGoogleAdvertisingIdCallback } from './callbacks';
