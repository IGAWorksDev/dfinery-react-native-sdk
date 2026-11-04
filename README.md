## Dfinery React Native SDK

This project contains the Dfinery plugin, a specialized package that allows integrators to use certain Dfinery APIs from React Native app code.

- [Dfinery User Guide](https://docs.dfinery.ai/user-guide)
- [Dfinery Developer Guide](https://docs.dfinery.ai/developer-guide/platform/reactnative)

### ℹ️ Information
- [Dfinery Android SDK](https://github.com/IGAWorksDev/dfinery-android-sdk)
- [Dfinery iOS SDK](https://github.com/IGAWorksDev/dfinery-ios-sdk)
- Android 4.4+ / API 19+
- iOS 12+ / Xcode 16.0+

### 🛠️ How to install

```sh
npm install @igaworks/dfinery-react-native-sdk
```

### 📦 iOS Dependency Management

Starting with React Native 0.88.0, you can choose between CocoaPods and Swift Package Manager (SPM) for iOS dependencies.

#### CocoaPods (Default)

For React Native projects using CocoaPods (default for RN < 0.88), no additional configuration is needed:

```sh
cd ios && pod install
```

#### Swift Package Manager (React Native 0.88.0+)

For React Native 0.88.0+ projects using SPM:

1. The SDK includes a `Package.swift` manifest that automatically integrates with React Native's SPM support.
2. When building your iOS app, the dependencies will be resolved through SPM instead of CocoaPods.

**Note:** SPM and CocoaPods should not be mixed for the same dependency. Choose one approach for your project.

### 🗄️ Changelog

Click [here](https://docs.dfinery.ai/developer-guide/platform/reactnative/change-log) to view the SDK Changelog.