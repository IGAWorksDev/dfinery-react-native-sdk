//
//  NotificationService.m
//  NotificationServiceExtension
//
//  Created by Jimmy.강세훈 on 3/7/25.
//

#import "NotificationService.h"

#import <DfinerySDKServiceExtension/DfinerySDKServiceExtension.h>

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];
    
    if (self.bestAttemptContent) {
        if ([DfineryServiceExtension canHandleWithContent:self.bestAttemptContent contentHandler:contentHandler]) {
            return;
        }
    }
    
    self.contentHandler(self.bestAttemptContent);
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    self.contentHandler(self.bestAttemptContent);
}

@end
