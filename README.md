## Dfinery React Native SDK

This project contains the Dfinery plugin, a specialized package that allows integrators to use certain Dfinery APIs from React Native app code.

- [Dfinery User Guide](https://docs.dfinery.ai/user-guide)
- [Dfinery Developer Guide](https://docs.dfinery.ai/developer-guide/platform/reactnative)

### ℹ️ Information
- [Dfinery Android SDK](https://github.com/IGAWorksDev/dfinery-android-sdk)
- [Dfinery iOS SDK](https://github.com/IGAWorksDev/dfinery-ios-sdk)
- React Native 0.88.0+
- iOS 15.0+ (Xcode 27+)
- Android SDK 24+

### 🛠️ How to install

```sh
npm install @igaworks/dfinery-react-native-sdk
```

### 📦 iOS Dependency Management

Starting with React Native 0.88.0, you can choose between CocoaPods and Swift Package Manager (SPM) for iOS dependencies.

#### Swift Package Manager (Recommended, React Native 0.88.0+)

For React Native 0.88.0+ projects using SPM:

1. The SDK includes a `Package.swift` manifest that automatically integrates with React Native's SPM support.
2. When building your iOS app, the dependencies will be resolved through SPM instead of CocoaPods.

#### CocoaPods

For React Native projects using CocoaPods (default for RN < 0.88), no additional configuration is needed:

```sh
cd ios && pod install
```

**Note:** SPM and CocoaPods should not be mixed for the same dependency. Choose one approach for your project. Since the [CocoaPods Specs repository will become read-only in December 2026](https://blog.cocoapods.org/CocoaPods-Specs-Repo/), SPM is recommended for new projects.

### 🗄️ Changelog

Click [here](./sdk/CHANGELOG.md) to view the SDK Changelog.

### 📂 Example Projects

This repository contains two example projects demonstrating different iOS dependency management approaches:

| Project | iOS Dependency | Description |
|---------|---------------|-------------|
| [example](./example) | Swift Package Manager | Recommended for React Native 0.88.0+. Uses native SPM integration. |
| [example_pods](./example_pods) | CocoaPods | For projects using CocoaPods or React Native < 0.88. |

Both examples include identical functionality and demonstrate SDK integration with push notifications and tracking transparency.