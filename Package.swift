// swift-tools-version: 5.7

import PackageDescription

let package = Package(
    name: "dfinery-react-native-sdk",
    platforms: [.iOS(.v12)],
    products: [
        .library(
            name: "DfineryReactNativeSdk",
            targets: ["DfineryReactNativeSdk"]
        )
    ],
    dependencies: [
        .package(
            url: "https://github.com/IGAWorksDev/dfinery-ios-sdk.git",
            exact: "2.5.1"
        )
    ],
    targets: [
        .target(
            name: "DfineryReactNativeSdk",
            dependencies: [
                .product(name: "DfinerySDK", package: "dfinery-ios-sdk"),
                .product(name: "DfinerySDKServiceExtension", package: "dfinery-ios-sdk")
            ],
            path: "ios/DfineryReactNativeSdk/DfineryReactNativeSdk",
            publicHeadersPath: ".",
            cSettings: [
                .headerSearchPath(".")
            ]
        )
    ]
)
