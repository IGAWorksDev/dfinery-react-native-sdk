import { NativeModules, Platform } from 'react-native';

const { TrackingTransparency: NativeModule } = NativeModules;

export type TrackingStatus = 
  | 'unavailable'
  | 'denied'
  | 'authorized'
  | 'restricted'
  | 'not-determined';

export async function getTrackingStatus(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') {
    return 'unavailable';
  }
  
  if (!NativeModule) {
    console.warn('TrackingTransparency native module not found');
    return 'unavailable';
  }
  
  return NativeModule.getTrackingStatus();
}

export async function requestTrackingPermission(): Promise<TrackingStatus> {
  if (Platform.OS !== 'ios') {
    return 'unavailable';
  }
  
  if (!NativeModule) {
    console.warn('TrackingTransparency native module not found');
    return 'unavailable';
  }
  
  return NativeModule.requestTrackingPermission();
}
