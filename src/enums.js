export const DFEvent = {
  LOGIN: 'df_login',
  LOGOUT: 'df_logout',
  SIGN_UP: 'df_sign_up',
  PURCHASE: 'df_purchase',
  REFUND: 'df_refund',
  VIEW_HOME: 'df_view_home',
  VIEW_PRODUCT_DETAILS: 'df_view_product_details',
  ADD_TO_CART: 'df_add_to_cart',
  ADD_TO_WISHLIST: 'df_add_to_wishlist',
  VIEW_SEARCH_RESULT: 'df_view_search_result',
  SHARE_PRODUCT: 'df_share_product',
  VIEW_LIST: 'df_view_list',
  VIEW_CART: 'df_view_cart',
  REMOVE_CART: 'df_remove_cart',
  ADD_PAYMENT_INFO: 'df_add_payment_info',
};

export const DFEventProperty = {
  ITEMS: 'df_items',
  ITEM_ID: 'df_item_id',
  ITEM_NAME: 'df_item_name',
  ITEM_PRICE: 'df_price',
  ITEM_QUANTITY: 'df_quantity',
  ITEM_DISCOUNT: 'df_discount',
  ITEM_CATEGORY1: 'df_category1',
  ITEM_CATEGORY2: 'df_category2',
  ITEM_CATEGORY3: 'df_category3',
  ITEM_CATEGORY4: 'df_category4',
  ITEM_CATEGORY5: 'df_category5',
  TOTAL_REFUND_AMOUNT: 'df_total_refund_amount',
  ORDER_ID: 'df_order_id',
  DELIVERY_CHARGE: 'df_delivery_charge',
  PAYMENT_METHOD: 'df_payment_method',
  TOTAL_PURCHASE_AMOUNT: 'df_total_purchase_amount',
  SHARING_CHANNEL: 'df_sharing_channel',
  SIGN_CHANNEL: 'df_sign_channel',
  KEYWORD: 'df_keyword',
  DISCOUNT: 'df_discount',
};

export const DFUserProfile = {
  NAME: 'df_name',
  GENDER: 'df_gender',
  BIRTH: 'df_birth',
  MEMBERSHIP: 'df_membership',
  PUSH_ADS_OPTIN: 'df_push_ads_optin',
  SMS_ADS_OPTIN: 'df_sms_ads_optin',
  KAKAO_ADS_OPTIN: 'df_kakao_ads_optin',
  PUSH_NIGHT_ADS_OPTIN: 'df_push_night_ads_optin',
};

export const DFGender = {
  MALE: 'Male',
  FEMALE: 'Female',
  NON_BINARY: 'NonBinary',
  OTHER: 'Other',
};

export const DFIdentity = {
  EXTERNAL_ID: 'external_id',
  EMAIL: 'email',
  PHONE_NO: 'phone_no',
  KAKAO_USER_ID: 'kakao_user_id',
  LINE_USER_ID: 'line_user_id',
};

export const DFConfig = {
  IOS_LOG_ENABLE: 'df_config_log_enable',
  ANDROID_LOG_ENABLE: 'android_log_enable',
  ANDROID_LOG_LEVEL: 'android_log_level',
  ANDROID_NOTIFICATION_ICON_NAME: 'android_notification_icon_name',
  ANDROID_NOTIFICATION_CHANNEL_ID: 'android_notification_channel_id',
  ANDROID_NOTIFICATION_ACCENT_COLOR: 'android_notification_accent_color'
};

export const DFAndroidLogLevel = {
  VERBOSE: 2,
  DEBUG: 3,
  INFO: 4,
  WARN: 5,
  ERROR: 6,
  ASSERT: 7,
};

export const DFAndroidNotificationChannelProperty = {
  ID: 'id',
  NAME: 'name',
  DESCRIPTION: 'description',
  BADGE: 'badge',
  SOUND: 'sound',
  SOUND_URI: 'soundUri',
  IMPORTANCE: 'importance',
  LIGHTS: 'lights',
  VIBRATION: 'vibration',
  VISIBILITY: 'visibility',
  BYPASS_DND: 'bypassDnd',
  GROUP_ID: 'groupId',
};

export const DFAndroidNotificationChannelGroupProperty = {
  ID: 'id',
  NAME: 'name',
};

export const DFAndroidNotificationChannelImportance = {
  NONE: 0,
  MIN: 1,
  LOW: 2,
  DEFAULT: 3,
  HIGH: 4,
  MAX: 5,
};

export const DFAndroidNotificationChannelVisibility = {
  PUBLIC: 1,
  PRIVATE: 0,
  SECRET: -1,
}; 