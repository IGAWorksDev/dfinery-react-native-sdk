#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="DfineryReactNativeSdkExample"

echo "🔄 Switching to CocoaPods mode..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-*

# 2. SPM 설정 제거
echo "🗑️  Removing SPM configuration..."
cd "$IOS_DIR"
npx react-native spm deinit 2>/dev/null || true

# 3. CocoaPods 설치
echo "📦 Installing CocoaPods dependencies..."
pod install

echo "✅ CocoaPods mode activated."
echo "   Run 'npm run ios' or open ${PROJECT_NAME}.xcworkspace to build."
