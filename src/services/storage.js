// Cross-platform storage utility that works on both mobile and web
import * as SecureStore from 'expo-secure-store';

export const storage = {
  async setItem(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.warn('Storage set error:', error);
    }
  },

  async getItem(key) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.warn('Storage get error:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.warn('Storage remove error:', error);
    }
  },
};
