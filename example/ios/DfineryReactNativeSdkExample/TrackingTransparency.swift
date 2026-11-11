import Foundation
import AppTrackingTransparency
import React

@objc(TrackingTransparency)
class TrackingTransparency: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func getTrackingStatus(_ resolve: @escaping RCTPromiseResolveBlock,
                         rejecter reject: @escaping RCTPromiseRejectBlock) {
    if #available(iOS 14, *) {
      let status = ATTrackingManager.trackingAuthorizationStatus
      resolve(statusToString(status))
    } else {
      resolve("unavailable")
    }
  }
  
  @objc
  func requestTrackingPermission(_ resolve: @escaping RCTPromiseResolveBlock,
                                  rejecter reject: @escaping RCTPromiseRejectBlock) {
    if #available(iOS 14, *) {
      DispatchQueue.main.async {
        ATTrackingManager.requestTrackingAuthorization { status in
          resolve(self.statusToString(status))
        }
      }
    } else {
      resolve("unavailable")
    }
  }
  
  @available(iOS 14, *)
  private func statusToString(_ status: ATTrackingManager.AuthorizationStatus) -> String {
    switch status {
    case .notDetermined:
      return "not-determined"
    case .restricted:
      return "restricted"
    case .denied:
      return "denied"
    case .authorized:
      return "authorized"
    @unknown default:
      return "unavailable"
    }
  }
}
