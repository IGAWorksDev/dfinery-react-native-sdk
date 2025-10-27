#import "DfinerySDKManager.h"

@implementation DfinerySDKManager

+ (instancetype)shared 
{
    static DfinerySDKManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    return sharedInstance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        _isSDKInitialized = NO;
        _pendingResponse = nil;
        _deviceToken = nil;
    }
    return self;
}

- (void)handleNotificationResponse:(UNNotificationResponse *)response
{
    @synchronized(self) {
        if (self.isSDKInitialized) {
            (void)[[Dfinery shared] canHandleNotificationWithResponse:response];
        } else {
            self.pendingResponse = response;
        }
    }
}

- (void)processStoredResponseIfNeeded
{
    @synchronized(self) {
        if (self.isSDKInitialized && self.pendingResponse) {
            (void)[[Dfinery shared] canHandleNotificationWithResponse:self.pendingResponse];
            self.pendingResponse = nil;
        }
    }
}

- (void)initSDKWithServiceId:(NSString *)serviceId
{
    [[Dfinery shared] sdkInitWithServiceId:serviceId];
    
    @synchronized(self) {
        self.isSDKInitialized = YES;
    }
    
    [self processStoredResponseIfNeeded];
}

- (void)initSDKWithServiceId:(NSString *)serviceId config:(NSDictionary *)config
{
    [[Dfinery shared] sdkInit:serviceId withConfig:config];
    
    @synchronized(self) {
        self.isSDKInitialized = YES;
    }
    
    [self processStoredResponseIfNeeded];
}

// DfinerySDK 메서드들을 위임
- (void)logEvent:(NSString *)eventName withProperties:(NSDictionary *)properties
{
    [[Dfinery shared] logEvent:eventName withProperties:properties];
}

- (void)setUserProfileForKey:(NSString *)key value:(id)value
{
    [[Dfinery shared] setUserProfileForKey:key value:value];
}

- (void)setUserProfileWithDict:(NSDictionary *)values
{
    [[Dfinery shared] setUserProfileWithDict:values];
}

- (void)setIdentityForKey:(NSString *)key value:(NSString *)value
{
    [[Dfinery shared] setIdentityForKey:key value:value];
}

- (void)setIdentityWithDict:(NSDictionary *)values
{
    [[Dfinery shared] setIdentityWithDict:values];
}

- (void)resetIdentity
{
    [[Dfinery shared] resetIdentity];
}

- (void)enableSDK
{
    [[Dfinery shared] enableSDK];
}

- (void)disableSDK
{
    [[Dfinery shared] disableSDK];
}

- (void)setPushTokenWithData:(NSData *)data
{
    [[Dfinery shared] setPushTokenWithData:data];
}

- (void)pend
{
    [[Dfinery shared] pend];
}

- (BOOL)canHandleForeground:(UNNotification *)notification completionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    return [[Dfinery shared] canHandleForeground:notification completionHandler:completionHandler];
}

@end 