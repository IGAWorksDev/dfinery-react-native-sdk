#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TrackingTransparency, NSObject)

RCT_EXTERN_METHOD(getTrackingStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(requestTrackingPermission:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
