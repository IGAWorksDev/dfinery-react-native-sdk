//
//  NotificationService.swift
//  NotificationServiceExtension
//
//  Created by Jimmy.강세훈 on 3/7/25.
//

import UserNotifications
import DfinerySDKServiceExtension

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
        if let bestAttemptContent = bestAttemptContent {
            if DfineryServiceExtension.canHandle(content: bestAttemptContent, contentHandler: contentHandler) {
                return
            }
        }
        
        contentHandler(bestAttemptContent ?? request.content)
    }
    
    override func serviceExtensionTimeWillExpire() {
        if let contentHandler = contentHandler, let bestAttemptContent = bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}
