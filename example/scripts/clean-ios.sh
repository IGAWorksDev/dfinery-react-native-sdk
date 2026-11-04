#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IOS_DIR="$SCRIPT_DIR/../ios"
PROJECT_NAME="DfineryReactNativeSdkExample"

echo "🧹 Cleaning iOS build artifacts..."

# 1. DerivedData 캐시 삭제
echo "🗑️  Clearing Xcode DerivedData..."
rm -rf ~/Library/Developer/Xcode/DerivedData/${PROJECT_NAME}-*

# 2. 로컬 빌드 캐시 삭제
echo "🗑️  Clearing local build directory..."
rm -rf "$IOS_DIR/build"

echo "✅ iOS build artifacts cleaned."
