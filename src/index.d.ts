// Type definitions for dfinery-react-native-sdk

export interface DFEvent {
  readonly LOGIN: 'df_login';
  readonly LOGOUT: 'df_logout';
  readonly SIGN_UP: 'df_sign_up';
  readonly PURCHASE: 'df_purchase';
  readonly REFUND: 'df_refund';
  readonly VIEW_HOME: 'df_view_home';
  readonly VIEW_PRODUCT_DETAILS: 'df_view_product_details';
  readonly ADD_TO_CART: 'df_add_to_cart';
  readonly ADD_TO_WISHLIST: 'df_add_to_wishlist';
  readonly VIEW_SEARCH_RESULT: 'df_view_search_result';
  readonly SHARE_PRODUCT: 'df_share_product';
  readonly VIEW_LIST: 'df_view_list';
  readonly VIEW_CART: 'df_view_cart';
  readonly REMOVE_CART: 'df_remove_cart';
  readonly ADD_PAYMENT_INFO: 'df_add_payment_info';
}

export interface DFEventProperty {
  readonly ITEMS: 'df_items';
  readonly ITEM_ID: 'df_item_id';
  readonly ITEM_NAME: 'df_item_name';
  readonly ITEM_PRICE: 'df_price';
  readonly ITEM_QUANTITY: 'df_quantity';
  readonly ITEM_DISCOUNT: 'df_discount';
  readonly ITEM_CATEGORY1: 'df_category1';
  readonly ITEM_CATEGORY2: 'df_category2';
  readonly ITEM_CATEGORY3: 'df_category3';
  readonly ITEM_CATEGORY4: 'df_category4';
  readonly ITEM_CATEGORY5: 'df_category5';
  readonly TOTAL_REFUND_AMOUNT: 'df_total_refund_amount';
  readonly ORDER_ID: 'df_order_id';
  readonly DELIVERY_CHARGE: 'df_delivery_charge';
  readonly PAYMENT_METHOD: 'df_payment_method';
  readonly TOTAL_PURCHASE_AMOUNT: 'df_total_purchase_amount';
  readonly SHARING_CHANNEL: 'df_sharing_channel';
  readonly SIGN_CHANNEL: 'df_sign_channel';
  readonly KEYWORD: 'df_keyword';
  readonly DISCOUNT: 'df_discount';
}

export interface DFUserProfile {
  readonly NAME: 'df_name';
  readonly GENDER: 'df_gender';
  readonly BIRTH: 'df_birth';
  readonly MEMBERSHIP: 'df_membership';
  readonly PUSH_ADS_OPTIN: 'df_push_ads_optin';
  readonly SMS_ADS_OPTIN: 'df_sms_ads_optin';
  readonly KAKAO_ADS_OPTIN: 'df_kakao_ads_optin';
  readonly PUSH_NIGHT_ADS_OPTIN: 'df_push_night_ads_optin';
}

export interface DFGender {
  readonly MALE: 'Male';
  readonly FEMALE: 'Female';
  readonly NON_BINARY: 'NonBinary';
  readonly OTHER: 'Other';
}

export interface DFIdentity {
  readonly EXTERNAL_ID: 'external_id';
  readonly EMAIL: 'email';
  readonly PHONE_NO: 'phone_no';
  readonly KAKAO_USER_ID: 'kakao_user_id';
  readonly LINE_USER_ID: 'line_user_id';
}

export interface DFConfig {
  readonly IOS_LOG_ENABLE: 'df_config_log_enable';
  readonly ANDROID_LOG_ENABLE: 'android_log_enable';
  readonly ANDROID_LOG_LEVEL: 'android_log_level';
  readonly ANDROID_NOTIFICATION_ICON_NAME: 'android_notification_icon_name';
  readonly ANDROID_NOTIFICATION_CHANNEL_ID: 'android_notification_channel_id';
  readonly ANDROID_NOTIFICATION_ACCENT_COLOR: 'android_notification_accent_color';
}

export interface DFAndroidLogLevel {
  readonly VERBOSE: 2;
  readonly DEBUG: 3;
  readonly INFO: 4;
  readonly WARN: 5;
  readonly ERROR: 6;
  readonly ASSERT: 7;
}

export interface DFAndroidNotificationChannelProperty {
  readonly ID: 'id';
  readonly NAME: 'name';
  readonly DESCRIPTION: 'description';
  readonly BADGE: 'badge';
  readonly SOUND: 'sound';
  readonly SOUND_URI: 'soundUri';
  readonly IMPORTANCE: 'importance';
  readonly LIGHTS: 'lights';
  readonly VIBRATION: 'vibration';
  readonly VISIBILITY: 'visibility';
  readonly BYPASS_DND: 'bypassDnd';
  readonly GROUP_ID: 'groupId';
}

export interface DFAndroidNotificationChannelGroupProperty {
  readonly ID: 'id';
  readonly NAME: 'name';
}

export interface DFAndroidNotificationChannelImportance {
  readonly NONE: 0;
  readonly MIN: 1;
  readonly LOW: 2;
  readonly DEFAULT: 3;
  readonly HIGH: 4;
  readonly MAX: 5;
}

export interface DFAndroidNotificationChannelVisibility {
  readonly PUBLIC: 1;
  readonly PRIVATE: 0;
  readonly SECRET: -1;
}

export declare class DFGetGoogleAdvertisingIdCallback {
  private _googleAdvertisingId: string;
  private _isLimitAdTrackingEnabled: boolean;

  constructor(googleAdvertisingId: string, isLimitAdTrackingEnabled: boolean);

  get googleAdvertisingId(): string;
  get isLimitAdTrackingEnabled(): boolean;
}

export default class Dfinery {
  static init(serviceId: string): void;
  static initWithConfig(serviceId: string, config: object | undefined | null): void;
  static logEvent(eventName: string, properties: { [key: string]: any } | undefined | null): void;
  static enableSDK(): void;
  static disableSDK(): void;
  static setUserProfile(key: string, value: any): void;
  static setUserProfiles(values: { [key: string]: any }): void;
  static setIdentity(key: string, value: string): void;
  static setIdentities(values: object): void;
  static resetIdentity(): void;
  static setGoogleAdvertisingId(googleAdvertisingId: string | null, isLimitAdTrackingEnabled: boolean): void;
  static getGoogleAdvertisingId(): Promise<DFGetGoogleAdvertisingIdCallback | null>;
  static setPushToken(pushToken: string | null): void;
  static getPushToken(): Promise<string | null>;
  static createNotificationChannel(properties: object | undefined | null): void;
  static deleteNotificationChannel(channelId: string): void;
  static createNotificationChannelGroup(properties: object | undefined | null): void;
  static deleteNotificationChannelGroup(channelGroupId: string): void;
}

// Export const declarations
export declare const DFEvent: DFEvent;
export declare const DFEventProperty: DFEventProperty;
export declare const DFUserProfile: DFUserProfile;
export declare const DFGender: DFGender;
export declare const DFIdentity: DFIdentity;
export declare const DFConfig: DFConfig;
export declare const DFAndroidLogLevel: DFAndroidLogLevel;
export declare const DFAndroidNotificationChannelProperty: DFAndroidNotificationChannelProperty;
export declare const DFAndroidNotificationChannelGroupProperty: DFAndroidNotificationChannelGroupProperty;
export declare const DFAndroidNotificationChannelImportance: DFAndroidNotificationChannelImportance;
export declare const DFAndroidNotificationChannelVisibility: DFAndroidNotificationChannelVisibility; 