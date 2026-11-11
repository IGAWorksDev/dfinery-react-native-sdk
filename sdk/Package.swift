// swift-tools-version: 5.7
// Built through React Native's SwiftPM autolinker, which links this package at
// <app>/build/generated/autolinking/libs/DfineryReactNativeSdk. The relative package paths
// resolve from there to the app's React Native xcframeworks and codegen output.

import Foundation
import PackageDescription

// Exclude every root entry the target does not use to prevent resource scanning issues
let usedRootEntries: Set<String> = ["ios", "Package.swift"]
let unusedRootEntries = (try? FileManager.default.contentsOfDirectory(atPath: Context.packageDirectory)
    .filter { !usedRootEntries.contains($0) }
    .sorted()) ?? []

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
            exact: "2.6.1"
        ),
        // React Native dependencies - resolved from autolinker symlinks
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
    ],
    targets: [
        .target(
            name: "DfineryReactNativeSdk",
            dependencies: [
                .product(name: "DfinerySDK", package: "dfinery-ios-sdk"),
                .product(name: "DfinerySDKServiceExtension", package: "dfinery-ios-sdk"),
                .product(name: "ReactHeaders", package: "ReactNative"),
                .product(name: "ReactNativeHeaders", package: "ReactNative"),
            ],
            path: ".",
            exclude: ["ios/DfineryReactNativeSdk.xcodeproj"] + unusedRootEntries,
            sources: ["ios"],
            publicHeadersPath: "ios",
            cSettings: [
                .headerSearchPath("ios")
            ]
        )
    ]
)
