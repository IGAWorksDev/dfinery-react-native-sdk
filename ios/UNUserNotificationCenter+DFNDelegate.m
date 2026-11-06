#import <UserNotifications/UNUserNotificationCenter.h>
#import <UserNotifications/UserNotifications.h>

#import "DFNSwizzler.h"
#import "DfinerySDKManager.h"

@implementation UNUserNotificationCenter (DFNDelegate)

+ (void)load 
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        SEL originalSelector = @selector(setDelegate:);
        SEL swizzledSelector = @selector(dfinery_setDelegate:);
        Method originalMethod = class_getInstanceMethod(self, originalSelector);
        Method swizzledMethod = class_getInstanceMethod(self, swizzledSelector);
        
        method_exchangeImplementations(originalMethod, swizzledMethod);
    });
}

- (void)dfinery_setDelegate:(id<UNUserNotificationCenterDelegate>)delegate
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class appDelegate = [delegate class];
        dfinery_swizzle(self.class,
                @selector(dfinery_UserNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:),
                appDelegate,
                @selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:));
        dfinery_swizzle(self.class,
                @selector(dfinery_UserNotificationCenter:willPresentNotification:withCompletionHandler:),
                appDelegate,
                @selector(userNotificationCenter:willPresentNotification:withCompletionHandler:));
        [self dfinery_setDelegate:delegate];
    });
}

- (void)dfinery_UserNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler
{
    if ([self respondsToSelector:@selector(dfinery_UserNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:)]) {
        
        [[DfinerySDKManager shared] handleNotificationResponse:response];
        
        [self dfinery_UserNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
    } else {
        [[DfinerySDKManager shared] handleNotificationResponse:response];
        completionHandler();
    }
}
    
- (void)dfinery_UserNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
{
    
    if ([self respondsToSelector:@selector(dfinery_UserNotificationCenter:willPresentNotification:withCompletionHandler:)]) {
        
        (void)[[DfinerySDKManager shared] canHandleForeground:notification completionHandler:completionHandler];
        
        [self dfinery_UserNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler];
    } else {
        if ([[DfinerySDKManager shared] canHandleForeground:notification completionHandler:completionHandler]) {
            return;
        }
    }

}

@end
