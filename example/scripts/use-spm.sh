#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="DfineryReactNativeSdkExample"

echo "🔄 Switching to SPM mode..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-*

# 2. CocoaPods 아티팩트 제거
echo "🗑️  Removing CocoaPods artifacts..."
cd "$IOS_DIR"
rm -rf Pods
rm -f Podfile.lock
rm -rf "${PROJECT_NAME}.xcworkspace"

# 3. SPM 모드 활성화
echo "📦 Enabling Swift Package Manager..."
npx react-native spm

echo "✅ SPM mode activated."
echo "   Run 'npm run ios' or open ${PROJECT_NAME}.xcodeproj to build."
