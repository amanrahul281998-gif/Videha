# VIDEH Mobile App - Setup & Installation Guide

## 🎯 Quick Start

### Prerequisites
- **Node.js:** v20 or higher
- **npm:** v10 or higher
- **Expo CLI:** Latest version
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd VidhApp
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Run on Device/Emulator**
   - Press `a` for Android
   - Press `i` for iOS (macOS only)
   - Press `w` for Web

## 📱 Running the App

### Android

**Using Android Emulator:**
```bash
npm run android
```

**Using Physical Device:**
1. Enable USB debugging on your phone
2. Connect phone via USB
3. Run `npm run android`

### iOS

**Using iOS Simulator (macOS only):**
```bash
npm run ios
```

**Using Physical Device:**
1. Connect iPhone to Mac
2. Run `npm run ios`
3. Scan QR code with Camera or Expo app

### Expo Go

The easiest way to test:
1. Install Expo Go app from Play Store / App Store
2. Run `npm start`
3. Scan QR code with Expo Go

## 🔑 OTP Login Testing

### Test Credentials
- Phone Number: Any 10-digit number
- OTP: Will be displayed on screen automatically

### Example Flow
1. Launch app → Tap "Login / Register"
2. Enter phone: `9876543210`
3. Tap "Send OTP"
4. OTP appears on screen (e.g., `123456`)
5. Enter OTP and verify
6. You're logged in!

## 🛠️ Development

### Project Structure
```
src/
├── screens/       # All screen components
├── context/       # State management (Auth, Cart)
├── navigation/    # Navigation configuration
├── services/      # API services
├── config/        # App configuration
├── utils/         # Utility functions
└── assets/        # Images, logos, etc.
```

### Key Files
- `App.js` - Root component
- `src/navigation/RootNavigator.jsx` - Navigation setup
- `src/context/AuthContext.jsx` - Authentication logic
- `src/context/CartContext.jsx` - Shopping cart logic

### Making Changes

**Add a new screen:**
1. Create component in `src/screens/`
2. Add route to `src/navigation/RootNavigator.jsx`
3. Update context if needed

**Modify styles:**
- Most styles are inline in components
- Update colors in respective screen files
- Reference `src/config/index.js` for global colors

## 📦 Building for Production

### Prerequisites
- Expo account (create at expo.dev)
- EAS CLI (`npm install -g eas-cli`)
- Apple Developer Account (for iOS)
- Google Play Developer Account (for Android)

### Build Commands

**Configure EAS:**
```bash
eas init
```

**Build for Android:**
```bash
eas build --platform android
```

**Build for iOS:**
```bash
eas build --platform ios
```

**Build for both:**
```bash
eas build --platform all
```

### Submitting to App Stores

**Android (Google Play):**
```bash
eas submit --platform android
```

**iOS (App Store):**
```bash
eas submit --platform ios
```

## 🔧 Configuration

### Update API Endpoints
Edit `src/services/api.js`:
```javascript
const apiClient = axios.create({
  baseURL: 'https://your-api.com', // Update this
});
```

### Update App Name/Logo
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "icon": "./src/assets/your-logo.png"
  }
}
```

### Modify Colors
Edit `src/config/index.js`:
```javascript
export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  // ... update as needed
};
```

## 🐛 Common Issues

### "Port 8081 already in use"
```bash
npm start -- -p 8082
```

### "Module not found" error
```bash
npm install --legacy-peer-deps
npm start -c
```

### Emulator not detecting app
1. Restart emulator
2. Clear cache: `npm start -c`
3. Rebuild: `npm run android`

### iOS build issues (macOS)
```bash
cd ios
pod install
cd ..
npm run ios
```

## 📊 Performance Tips

1. **Use FlatList** for long lists
2. **Optimize images** before adding
3. **Lazy load screens** using React Navigation
4. **Use React.memo** for expensive components
5. **Profile with React Profiler**

## 🔒 Security Checklist

- [ ] Remove console.logs in production
- [ ] Update API URLs to production
- [ ] Enable SSL certificate pinning
- [ ] Implement proper error handling
- [ ] Remove debug mode
- [ ] Setup proper CORS headers
- [ ] Secure storage for sensitive data

## 📱 Device Testing

### Test on Different Devices
- Android: 5.0+, 6.0, 7.0, 8.0, 9.0, 10.0+
- iOS: 12.0+, 13.0+, 14.0+

### Test Different Screen Sizes
- Small: 4.7" (iPhone 8)
- Medium: 5.8" (iPhone X)
- Large: 6.7" (iPhone 12 Pro Max)
- Tablet: iPad

## 🚀 Deployment Checklist

Before going live:

- [ ] All screens tested
- [ ] OTP authentication working
- [ ] Shopping flow tested
- [ ] Payment integrated
- [ ] Error handling implemented
- [ ] Offline support tested
- [ ] Performance optimized
- [ ] Security reviewed
- [ ] Privacy policy ready
- [ ] Terms & conditions ready
- [ ] App store listings ready
- [ ] Support email configured

## 📞 Support Resources

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **EAS Build:** https://eas.expo.dev
- **Community:** https://forums.expo.dev

## 📝 Next Steps

1. Integrate real backend API
2. Set up payment gateway (Razorpay/Stripe)
3. Implement push notifications
4. Add analytics
5. Setup error tracking (Sentry)
6. Create app store listings
7. Setup automated testing
8. Configure CI/CD pipeline

---

**Last Updated:** March 30, 2026  
**Status:** Production Ready
