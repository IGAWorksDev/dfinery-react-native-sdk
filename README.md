## Dfinery React Native SDK

React Native 앱에서 Dfinery API를 사용할 수 있는 SDK입니다.

- [Dfinery Developer Guide](https://docs.dfinery.ai/developer-guide/platform/reactnative)

### 요구 사항

- React Native 0.88.0+
- iOS 15.0+ (Xcode 27+)
- Android SDK 19+

### 설치

```sh
npm install @igaworks/dfinery-react-native-sdk
```

### iOS 설정

#### Swift Package Manager (권장)

```sh
cd ios && npx react-native spm --deintegrate
```

#### CocoaPods

```sh
cd ios && pod install
```

> SPM과 CocoaPods를 동일 프로젝트에서 혼용하지 마세요.

### 예제 프로젝트

| 프로젝트 | iOS 의존성 | 설명 |
|---------|-----------|------|
| [example](./example) | SPM | 권장 |
| [example_pods](./example_pods) | CocoaPods | 레거시 |

### Changelog

[CHANGELOG.md](./sdk/CHANGELOG.md)
