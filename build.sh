#!/usr/bin/env bash

# Build script for production
# This script builds the app for both iOS and Android

echo "🚀 Starting Videh App Build Process..."
echo ""

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI not found. Installing..."
    npm install -g eas-cli
fi

echo "📱 Building Android APK..."
eas build --platform android --auto-submit

echo ""
echo "🍎 Building iOS App (requires macOS)..."
eas build --platform ios --auto-submit

echo ""
echo "✅ Build completed successfully!"
echo "📦 Builds are available in your EAS dashboard"
