import Foundation
import UserNotifications
import React

@objc(NotificationPermissions)
class NotificationPermissions: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func getPermissionStatus(_ resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
    UNUserNotificationCenter.current().getNotificationSettings { settings in
      resolve(self.statusToString(settings.authorizationStatus))
    }
  }
  
  @objc
  func requestPermission(_ options: [String],
                         resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
    var authOptions: UNAuthorizationOptions = []
    
    for option in options {
      switch option {
      case "alert":
        authOptions.insert(.alert)
      case "badge":
        authOptions.insert(.badge)
      case "sound":
        authOptions.insert(.sound)
      case "criticalAlert":
        authOptions.insert(.criticalAlert)
      case "providesAppNotificationSettings":
        authOptions.insert(.providesAppNotificationSettings)
      case "provisional":
        authOptions.insert(.provisional)
      case "announcement":
        if #available(iOS 13.0, *) {
          authOptions.insert(.announcement)
        }
      default:
        break
      }
    }
    
    if authOptions.isEmpty {
      authOptions = [.alert, .badge, .sound]
    }
    
    UNUserNotificationCenter.current().requestAuthorization(options: authOptions) { granted, error in
      if let error = error {
        reject("PERMISSION_ERROR", error.localizedDescription, error)
        return
      }
      
      // Register for remote notifications on main thread
      DispatchQueue.main.async {
        UIApplication.shared.registerForRemoteNotifications()
      }
      
      // Get the actual status after request
      UNUserNotificationCenter.current().getNotificationSettings { settings in
        resolve([
          "status": self.statusToString(settings.authorizationStatus),
          "granted": granted,
          "settings": [
            "alert": settings.alertSetting == .enabled,
            "badge": settings.badgeSetting == .enabled,
            "sound": settings.soundSetting == .enabled,
            "lockScreen": settings.lockScreenSetting == .enabled,
            "notificationCenter": settings.notificationCenterSetting == .enabled,
            "carPlay": settings.carPlaySetting == .enabled
          ]
        ])
      }
    }
  }
  
  private func statusToString(_ status: UNAuthorizationStatus) -> String {
    switch status {
    case .notDetermined:
      return "not-determined"
    case .denied:
      return "denied"
    case .authorized:
      return "authorized"
    case .provisional:
      return "provisional"
    case .ephemeral:
      return "ephemeral"
    @unknown default:
      return "unknown"
    }
  }
}
