#import "DfineryReactNativeSdk.h"
#import "DfinerySDKManager.h"

@implementation DfineryReactNativeSdk

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(init:(NSString *)serviceId)
{
    [[DfinerySDKManager shared] initSDKWithServiceId:serviceId];
}

RCT_EXPORT_METHOD(initWithConfig:(NSString *)serviceId config:(NSDictionary *)config)
{
    [[DfinerySDKManager shared] initSDKWithServiceId:serviceId config:config];
}

RCT_EXPORT_METHOD(logEvent:(NSString *)eventName properties:(NSDictionary *)properties)
{
    [[DfinerySDKManager shared] logEvent:eventName withProperties:properties];
}

RCT_EXPORT_METHOD(setUserProfile:(NSString *)key value:(id)value)
{
    [[DfinerySDKManager shared] setUserProfileForKey:key value:value];
}

RCT_EXPORT_METHOD(setUserProfiles:(NSDictionary *)values)
{
    [[DfinerySDKManager shared] setUserProfileWithDict:values];
}

RCT_EXPORT_METHOD(setIdentity:(NSString *)key value:(NSString *)value)
{
    [[DfinerySDKManager shared] setIdentityForKey:key value:value];
}

RCT_EXPORT_METHOD(setIdentities:(NSDictionary *)values)
{
    [[DfinerySDKManager shared] setIdentityWithDict:values];
}

RCT_EXPORT_METHOD(resetIdentity)
{
    [[DfinerySDKManager shared] resetIdentity];
}

RCT_EXPORT_METHOD(enableSDK)
{
    [[DfinerySDKManager shared] enableSDK];
}

RCT_EXPORT_METHOD(disableSDK)
{
    [[DfinerySDKManager shared] disableSDK];
}

RCT_EXPORT_METHOD(setPushToken:(NSString *)pushToken)
{
    
    if (!pushToken || [pushToken length] % 2 != 0) {
        RCTLogError(@"Invalid push token: %@", pushToken);
        return;
    }
    
    NSCharacterSet *hexCharacterSet = [NSCharacterSet characterSetWithCharactersInString:@"0123456789abcdefABCDEF"];
    NSCharacterSet *invalidCharacterSet = [hexCharacterSet invertedSet];
    NSRange invalidCharacterRange = [pushToken rangeOfCharacterFromSet:invalidCharacterSet];
    
    if (invalidCharacterRange.location != NSNotFound) {
        RCTLogError(@"Push token contains invalid characters: %@", pushToken);
        return;
    }
    
    NSMutableData *data = [[NSMutableData alloc] initWithCapacity:pushToken.length / 2];
    
    @try {
        for (int i = 0; i < pushToken.length; i += 2) {
            NSString *hexChar = [pushToken substringWithRange:NSMakeRange(i, 2)];
            unsigned int hexValue;
            [[NSScanner scannerWithString:hexChar] scanHexInt:&hexValue];
            unsigned char byte = (unsigned char)hexValue;
            [data appendBytes:&byte length:1];
        }
        [[DfinerySDKManager shared] setPushTokenWithData:data];
    } @catch (NSException *exception) {
        RCTLogError(@"Exception occurred while converting push token: %@", pushToken);
        return;
    }
}

RCT_EXPORT_METHOD(getPushToken:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *deviceToken = [DfinerySDKManager shared].deviceToken;
    if (deviceToken) {
        const unsigned char *dataBuffer = (const unsigned char *)[deviceToken bytes];
        if (!dataBuffer) {
            NSError *error = [NSError errorWithDomain:@"DfineryReactNativeSdk" code:500 userInfo:@{NSLocalizedDescriptionKey: @"Failed to convert device token"}];
            reject(@"conversion_error", @"Failed to convert device token", error);
            return;
        }
        
        NSUInteger dataLength = [deviceToken length];
        NSMutableString *hexString = [NSMutableString stringWithCapacity:(dataLength * 2)];
        
        for (int i = 0; i < dataLength; ++i) {
            [hexString appendString:[NSString stringWithFormat:@"%02x", dataBuffer[i]]];
        }
        
        resolve([NSString stringWithString:hexString]);
    } else {
        NSError *error = [NSError errorWithDomain:@"DfineryReactNativeSdk" code:404 userInfo:@{NSLocalizedDescriptionKey: @"Device token not found"}];
        reject(@"no_token", @"Device token not found", error);
    }
}

@end
