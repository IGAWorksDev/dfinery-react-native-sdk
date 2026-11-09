import { NativeModules, Platform } from 'react-native';

const { NotificationPermissions: NativeModule } = NativeModules;

export type NotificationStatus =
  | 'not-determined'
  | 'denied'
  | 'authorized'
  | 'provisional'
  | 'ephemeral'
  | 'unknown'
  | 'unavailable';

export type NotificationOption =
  | 'alert'
  | 'badge'
  | 'sound'
  | 'criticalAlert'
  | 'providesAppNotificationSettings'
  | 'provisional'
  | 'announcement';

export interface NotificationSettings {
  alert: boolean;
  badge: boolean;
  sound: boolean;
  lockScreen: boolean;
  notificationCenter: boolean;
  carPlay: boolean;
}

export interface NotificationPermissionResult {
  status: NotificationStatus;
  granted: boolean;
  settings: NotificationSettings;
}

/**
 * Get current notification permission status
 */
export async function getNotificationStatus(): Promise<NotificationStatus> {
  if (Platform.OS !== 'ios') {
    // Android handles notification permissions differently (POST_NOTIFICATIONS in Android 13+)
    return 'unavailable';
  }

  if (!NativeModule) {
    console.warn('NotificationPermissions native module not found');
    return 'unavailable';
  }

  return NativeModule.getPermissionStatus();
}

/**
 * Request notification permissions
 * @param options - Array of notification options to request
 * @returns Promise with permission result including status, granted flag, and settings
 */
export async function requestNotificationPermission(
  options: NotificationOption[] = ['alert', 'badge', 'sound']
): Promise<NotificationPermissionResult> {
  if (Platform.OS !== 'ios') {
    return {
      status: 'unavailable',
      granted: false,
      settings: {
        alert: false,
        badge: false,
        sound: false,
        lockScreen: false,
        notificationCenter: false,
        carPlay: false,
      },
    };
  }

  if (!NativeModule) {
    console.warn('NotificationPermissions native module not found');
    return {
      status: 'unavailable',
      granted: false,
      settings: {
        alert: false,
        badge: false,
        sound: false,
        lockScreen: false,
        notificationCenter: false,
        carPlay: false,
      },
    };
  }

  return NativeModule.requestPermission(options);
}
