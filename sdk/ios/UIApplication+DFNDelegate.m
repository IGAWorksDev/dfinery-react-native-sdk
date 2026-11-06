#import <UIKit/UIKit.h>
#import <objc/runtime.h>
#import "DFNSwizzler.h"
#import "DfinerySDKManager.h"


@implementation UIApplication (DFNDelegate)


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

- (void)dfinery_setDelegate:(id<UIApplicationDelegate>)delegate 
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        Class appDelegate = [delegate class];
        dfinery_swizzle(self.class,
                        @selector(dfinery_application:didFinishLaunchingWithOptions:),
                        appDelegate,
                        @selector(application:didFinishLaunchingWithOptions:));
        dfinery_swizzle(self.class,
                        @selector(dfinery_application:didRegisterForRemoteNotificationsWithDeviceToken:),
                        appDelegate,
                        @selector(application:didRegisterForRemoteNotificationsWithDeviceToken:));
        
        [self dfinery_setDelegate:delegate];
    });

}

#pragma mark - Method Swizzling

- (BOOL)dfinery_application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions 
{
    
    [[UNUserNotificationCenter currentNotificationCenter] setDelegate:(id<UNUserNotificationCenterDelegate>)application.delegate];
    
    [application registerForRemoteNotifications];
    
    [[DfinerySDKManager shared] pend];

    if ([self respondsToSelector:@selector(dfinery_application:didFinishLaunchingWithOptions:)])
        [self dfinery_application:application didFinishLaunchingWithOptions:launchOptions];
    return YES;
}

- (void)dfinery_application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
    [DfinerySDKManager shared].deviceToken = deviceToken;
    
    if([self respondsToSelector:@selector(dfinery_application:didRegisterForRemoteNotificationsWithDeviceToken:)])
        [self dfinery_application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
    return;
}

@end
