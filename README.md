# VIDEH - Premium Apparel E-Commerce Mobile Application

A production-ready, fully-featured e-commerce mobile application for iOS and Android with OTP-based authentication.

## 📋 Project Overview

**App Name:** Videh  
**Version:** 1.0.0  
**Platform:** iOS & Android (React Native with Expo)  
**Status:** Production Ready

## ✨ Key Features

### 🔐 Authentication
- **OTP-based Login/Register** - Secure mobile number verification
- **OTP Generation & Display** - Real-time OTP display for testing
- **Secure Storage** - Encrypted token storage using expo-secure-store
- **Session Management** - Automatic session persistence

### 🛍️ E-Commerce Features
- **Product Catalog** - Browse apparel collection with filtering
- **Product Details** - Comprehensive product information and specifications
- **Shopping Cart** - Add/remove items with quantity management
- **Cart Persistence** - Persistent cart across sessions
- **Checkout** - Complete order flow with order summary

### 👤 User Profile
- **User Profile** - View account information
- **Order History** - Track past orders
- **Wishlist** - Save favorite items
- **Addresses** - Manage delivery addresses
- **Payment Methods** - Secure payment management

### 🎨 UI/UX
- **Modern Design** - Beautiful gradient interfaces
- **Smooth Animations** - Fluid navigation transitions
- **Responsive Layouts** - Optimized for all device sizes
- **Tab Navigation** - Easy access to Shop, Cart, and Profile

## 📁 Project Structure

```
VidhApp/
├── src/
│   ├── screens/              # Screen components
│   ├── components/           # Reusable components
│   ├── context/             # Context API (Auth & Cart)
│   ├── navigation/          # Navigation setup
│   ├── services/            # API services
│   ├── config/              # App configuration
│   └── assets/              # Images & logos
├── App.js                   # Root component
├── app.json                 # Expo configuration
└── package.json             # Dependencies
```

## 🚀 Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
