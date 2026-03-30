// Cross-platform storage utility that works on both mobile and web
let isWeb = false;

try {
  isWeb = typeof window !== 'undefined' && !globalThis.nativeEvent;
} catch (e) {
  isWeb = false;
}

export const storage = {
  async setItem(key, value) {
    try {
      if (isWeb) {
        localStorage.setItem(key, value);
      } else {
        const SecureStore = require('expo-secure-store');
        await SecureStore.setItemAsync(key, value);
      }
    } catch (error) {
      console.warn('Storage set error:', error);
    }
  },

  async getItem(key) {
    try {
      if (isWeb) {
        return localStorage.getItem(key);
      } else {
        const SecureStore = require('expo-secure-store');
        return await SecureStore.getItemAsync(key);
      }
    } catch (error) {
      console.warn('Storage get error:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      if (isWeb) {
        localStorage.removeItem(key);
      } else {
        const SecureStore = require('expo-secure-store');
        await SecureStore.deleteItemAsync(key);
      }
    } catch (error) {
      console.warn('Storage remove error:', error);
    }
  },
};
