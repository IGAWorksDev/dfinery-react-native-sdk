import UIKit
import React
import React_RCTAppDelegate

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?
  var reactNativeFactory: RCTReactNativeFactory?
  var reactNativeDelegate: RCTDefaultReactNativeFactoryDelegate?

  func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
    guard let windowScene = scene as? UIWindowScene else { return }

    let delegate = RCTDefaultReactNativeFactoryDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    self.reactNativeDelegate = delegate
    self.reactNativeFactory = factory

    window = UIWindow(windowScene: windowScene)

    factory.startReactNative(
      withModuleName: "DfineryReactNativeSdkExample",
      in: window,
      connectionOptions: connectionOptions
    )
  }

  // MARK: - Deep Linking

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    for context in URLContexts {
      RCTLinkingManager.application(
        UIApplication.shared,
        open: context.url,
        options: [:]
      )
    }
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    RCTLinkingManager.application(
      UIApplication.shared,
      continue: userActivity,
      restorationHandler: { _ in }
    )
  }
}
