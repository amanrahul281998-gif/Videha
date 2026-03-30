# APK File बनाने के लिए Guide

## विकल्प 1: EAS Build (Best तरीका - Recommended) ⭐

### Step 1: EAS CLI Install करें
```powershell
npm install -g eas-cli
```

### Step 2: Expo Account बनाएं
- https://expo.dev पर जाएं
- Sign up करें
- Confirm करें

### Step 3: Login करें
```powershell
cd c:\Users\prash\Desktop\Videh
eas login
# अपना email और password डालें
```

### Step 4: Project Initialize करें (पहली बार)
```powershell
eas build:configure
# Android चुनें
```

### Step 5: APK Build करें
```powershell
eas build --platform android --local
```

या Cloud पर build करने के लिए:
```powershell
eas build --platform android
```

### Step 6: Download करें
- Build complete होने के बाद link दिएगा
- APK file download करें
- अपने phone पर install करें

---

## विकल्प 2: Local Build (Advanced)

### Prerequisites:
- Android Studio installed
- Java Development Kit (JDK) 11+
- Android SDK

### Commands:
```powershell
cd c:\Users\prash\Desktop\Videh

# Android build करें
npm run android

# या Production APK release करें
eas build --platform android --profile preview
```

---

## विकल्प 3: Manual Build (सबसे Advanced)

### Step 1: app.json में app ID set करें
```json
{
  "expo": {
    "name": "Videh",
    "slug": "videh",
    "version": "1.0.0",
    "android": {
      "package": "com.videh.app"
    }
  }
}
```

### Step 2: build folder clean करें
```powershell
cd c:\Users\prash\Desktop\Videh
npm run android -- --reset-cache
```

### Step 3: Production build करें
```powershell
expo build:android -t app-bundle
```

---

## APK फ़ाइल को Phone पर Install करने के लिए

### आसान तरीका (USB से):
```powershell
adb install path\to\your\app.apk
```

### या Manually:
1. APK file को phone पर transfer करें
2. File Manager में find करें
3. Tap करके install करें
4. "Unknown sources" को allow करें (Settings में)

---

## Build Options

| Option | समय | Cost | Features |
|--------|------|------|----------|
| **EAS Cloud Build** | 3-5 min | Free (limited) | Best stability |
| **EAS Local Build** | 10-15 min | Free | Need local setup |
| **Custom Build** | 20-30 min | Free | Maximum control |

---

## Environment Variables के लिए

अगर backend को use करना है, तो `.env` file set करें:

```env
REACT_APP_BACKEND_URL=https://videh-backend.onrender.com
REACT_APP_API_KEY=your_api_key
```

---

## Troubleshooting

### ❌ Build fail हो रहा है?
```powershell
# Cache clear करें
eas build:cache --platform=android --clear

# फिर से build करें
eas build --platform android
```

### ❌ APK install नहीं हो रहा?
- Android 5.0+ requirement check करें
- "Unknown sources" enable करें
- APK file को delete करके फिर download करें

### ❌ Package name conflict?
`app.json` में unique package name डालें:
```json
"android": {
  "package": "com.yourcompany.videh"
}
```

---

## Release Build के लिए

Production के लिए signing key जरूरी है:

```powershell
# Keystore generate करें (बस एक बार)
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# फिर eas.json में add करें
```

---

## Final Checklist ✅

- [ ] Node.js installed है
- [ ] npm dependencies installed हैं (`npm install`)
- [ ] Expo CLI installed है
- [ ] Expo account बना लिया है
- [ ] app.json सही है
- [ ] Backend URL correct है (.env में)
- [ ] Internet connection है

---

## Quick Start Command

```powershell
# सब कुछ setup करके APK बनाएं:
cd c:\Users\prash\Desktop\Videh
npm install
eas login
eas build --platform android --local
```

APK तैयार हो जाएगी! 🎉
