#import <Foundation/Foundation.h>
#import <UserNotifications/UNUserNotificationCenter.h>
#import <DfinerySDK/DfinerySDK.h>

@interface DfinerySDKManager : NSObject

+ (instancetype)shared;

@property (atomic, strong) NSData *deviceToken;
@property (atomic, strong) UNNotificationResponse *pendingResponse;
@property (atomic, assign) BOOL isSDKInitialized;

- (void)handleNotificationResponse:(UNNotificationResponse *)response;
- (void)initSDKWithServiceId:(NSString *)serviceId;
- (void)initSDKWithServiceId:(NSString *)serviceId config:(NSDictionary *)config;

// DfinerySDK 메서드들을 위임
- (void)logEvent:(NSString *)eventName withProperties:(NSDictionary *)properties;
- (void)setUserProfileForKey:(NSString *)key value:(id)value;
- (void)setUserProfileWithDict:(NSDictionary *)values;
- (void)setIdentityForKey:(NSString *)key value:(NSString *)value;
- (void)setIdentityWithDict:(NSDictionary *)values;
- (void)resetIdentity;
- (void)enableSDK;
- (void)disableSDK;
- (void)setPushTokenWithData:(NSData *)data;
- (void)pend;
- (BOOL)canHandleForeground:(UNNotification *)notification completionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler;

@end 