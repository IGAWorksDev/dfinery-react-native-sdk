import React, {useEffect} from 'react';

import { StyleSheet, View, Text, Button, Alert, SafeAreaView, ScrollView, StatusBar, Platform} from 'react-native';
import Dfinery, { DFAndroidNotificationChannelImportance, DFAndroidNotificationChannelProperty, DFAndroidNotificationChannelVisibility, DFConfig, DFEvent, DFEventProperty, DFGender, DFIdentity, DFAndroidLogLevel, DFUserProfile, DFIOSLogLevel} from '@igaworks/dfinery-react-native-sdk';

import {requestNotifications } from "react-native-permissions";
import { requestTrackingPermission } from "react-native-tracking-transparency";

export default function App() {

  useEffect(() => {
    sdkInit();
    createAndroidNotificationChannel();
    refreshPushToken();
    refreshGoogleAdvertisingId();
    requestNotificationPermission();
    return () => {
      
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView  style={styles.scrollView}>
        <View style={styles.category}>
          <View style={styles.column}>
            <Text style={styles.titleText}>LogEvent</Text>
            <Button title="Login" onPress={onPressLogin} />
            <Button title="Purchase" onPress={onPressPurchase} />
            <Button title="CustomEvent" onPress={onPressCustomEvent} />
            <Text style={styles.titleText}>UserProfile</Text>
            <Button title="setUserProfile" onPress={onPressSetUserProfile} />
            <Button title="setUserProfiles" onPress={onPressSetUserProfiles} />
            <Text style={styles.titleText}>Identity</Text>
            <Button title="setIdentity" onPress={onPressSetIdentity} />
            <Button title="setIdentities" onPress={onPressSetIdentities} />
            <Text style={styles.titleText}>ATT (iOS)</Text>
            <Button title="Request ATT Permission" onPress={requestTrackingAuthorization} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sdkInit = () => {
  const config = {
    [DFConfig.IOS_LOG_LEVEL]: DFIOSLogLevel.VERBOSE,
    [DFConfig.ANDROID_LOG_ENABLE]: true,
    [DFConfig.ANDROID_LOG_LEVEL]: DFAndroidLogLevel.VERBOSE,
    [DFConfig.ANDROID_NOTIFICATION_ICON_NAME]: 'ic_dfinery',
    [DFConfig.ANDROID_NOTIFICATION_CHANNEL_ID]: 'com.dfineryreactnativesdkexample.notificationChannel',
    [DFConfig.ANDROID_NOTIFICATION_ACCENT_COLOR]: '#FF3700B3'
  };
  // Dfinery.initWithConfig("SERVICE_ID", config);
  Dfinery.initWithConfig("YOUR_SERVICE_ID", config);
};

const createAndroidNotificationChannel = () =>{
  const properties = {
    [DFAndroidNotificationChannelProperty.ID]: 'com.dfineryreactnativesdkexample.notificationChannel',
    [DFAndroidNotificationChannelProperty.NAME]: 'Default Notification Channel',
    [DFAndroidNotificationChannelProperty.IMPORTANCE]: DFAndroidNotificationChannelImportance.HIGH,
    [DFAndroidNotificationChannelProperty.BADGE]: true,
    [DFAndroidNotificationChannelProperty.SOUND]: true,
    [DFAndroidNotificationChannelProperty.VISIBILITY]: DFAndroidNotificationChannelVisibility.PUBLIC,
    [DFAndroidNotificationChannelProperty.VIBRATION]: true
  };
  Dfinery.createNotificationChannel(properties);
}

const refreshGoogleAdvertisingId = () =>{
  Dfinery.getGoogleAdvertisingId().then((value)=>{
    if(value != null){
      Dfinery.setGoogleAdvertisingId(value.googleAdvertisingId, value.isLimitAdTrackingEnabled);
    }
  });
}

const refreshPushToken = () => {
  Dfinery.getPushToken().then((token)=>{
    if(token != null){
      console.log('Push Token:', token);
      Dfinery.setPushToken(token);
    }
  }).catch((error) => {
    console.log('Error getting push token:', error);
  });
}

const onPressLogin = () => {
  Dfinery.logEvent(DFEvent.LOGIN, null);
  // Alert.alert('Login button pressed');
};

const onPressPurchase = () => {
  const item = {
    [DFEventProperty.ITEM_ID]: "상품번호",
    [DFEventProperty.ITEM_NAME]: "상품이름",
    [DFEventProperty.ITEM_CATEGORY1]: "식품",
    [DFEventProperty.ITEM_CATEGORY2]: "과자",
    [DFEventProperty.ITEM_PRICE]: 5000.0,
    [DFEventProperty.ITEM_DISCOUNT]: 500.0,
    [DFEventProperty.ITEM_QUANTITY]: 5
  }
  const items = [item];
  const param = {
    [DFEventProperty.ITEMS]: items,
    [DFEventProperty.ORDER_ID]: "주문번호",
    [DFEventProperty.PAYMENT_METHOD]: "BankTransfer",
    [DFEventProperty.TOTAL_PURCHASE_AMOUNT]: 25500.0,
    [DFEventProperty.DELIVERY_CHARGE]: 3000.0,
    [DFEventProperty.ITEM_DISCOUNT]:0
  };
  Dfinery.logEvent(DFEvent.PURCHASE, param);

};

const onPressCustomEvent = () => {
  const sampleDate = new Date('2014-05-14');
  const param = {
    'custom_property_1':34000,
    'custom_property_2':42.195,
    'custom_property_3':"Seoul",
    'custom_property_4':true,
    'custom_property_5':sampleDate,
    'custom_property_6':"1999-01-01",
    'custom_property_7':[20,30,40],
    'custom_property_8':[1.1,1.2,1.3],
    'custom_property_9':["Hello","World"]
};
Dfinery.logEvent('custom_event', param);
// Alert.alert('Custom Event button pressed');
};

const onPressSetUserProfile = () => {
  Dfinery.setUserProfile(DFUserProfile.NAME, 'Tester');
  // Alert.alert('Set User Profile button pressed');
};

const onPressSetUserProfiles = () => {
  const sampleDate = new Date('2014-05-14');
  const param = {
    [DFUserProfile.GENDER]: DFGender.FEMALE,
    [DFUserProfile.BIRTH]: "1999-01-01",
    [DFUserProfile.MEMBERSHIP]: "VIP",
    [DFUserProfile.PUSH_ADS_OPTIN]: true,
    [DFUserProfile.SMS_ADS_OPTIN]: false,
    [DFUserProfile.KAKAO_ADS_OPTIN]: true,
    [DFUserProfile.PUSH_NIGHT_ADS_OPTIN]: false,
    'custom_user_profile_1': 34000,
    'custom_user_profile_2': 42.195,
    'custom_user_profile_3': sampleDate,
    'custom_user_profile_4': [20,30],
    'custom_user_profile_5': [1.1, 1.2],
    'custom_user_profile_6': ["Hello","World"]
  };
  Dfinery.setUserProfiles(param);
  // Alert.alert('Set User Profiles button pressed');
};

const onPressSetIdentity = () => {
  Dfinery.setIdentity(DFIdentity.EXTERNAL_ID, 'user_a1b2c3d4');
  // Alert.alert('Set Identity button pressed');
};

const onPressSetIdentities = () => {
  const param = {
    [DFIdentity.EMAIL]: 'sample.user@example.com',
    [DFIdentity.PHONE_NO]: '821012345678',
    [DFIdentity.KAKAO_USER_ID]: 'kakao_u98765',
    [DFIdentity.LINE_USER_ID]: 'line_i10293',
};
Dfinery.setIdentities(param);
  // Alert.alert('Set Identities button pressed');
};

const requestNotificationPermission = () => {
  requestNotifications(['alert', 'sound']).then(({status}) => {
    if(status === 'granted'){
      Dfinery.getPushToken().then((token)=>{
        Dfinery.setPushToken(token);
      }).catch((error) => {
        // 시뮬레이터에서는 푸시 토큰을 받을 수 없음
        console.log('Push token not available (expected on simulator):', error.message);
      });
    }
  });
  
};

const requestTrackingAuthorization = async () => {
  if (Platform.OS === 'ios') {
    const trackingStatus = await requestTrackingPermission();
    switch (trackingStatus) {
      case 'authorized':
        Dfinery.attAuthorized(true);
        Alert.alert('ATT', '추적 권한이 허용되었습니다.');
        break;
      case 'denied':
      case 'restricted':
        Dfinery.attAuthorized(false);
        Alert.alert('ATT', '추적 권한이 거부되었습니다.');
        break;
      case 'unavailable':
        Alert.alert('ATT', 'ATT를 사용할 수 없습니다. (iOS 14 미만)');
        break;
      case 'not-determined':
        Alert.alert('ATT', '권한이 아직 결정되지 않았습니다.');
        break;
    }
  } else {
    Alert.alert('ATT', 'ATT 권한 요청은 iOS에서만 지원됩니다.');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView:{

  },
  category:{

  },
  column: {
    
  },
  titleText:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitleText:{
    fontSize: 18
  },
});
