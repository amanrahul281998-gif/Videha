import Constants from 'expo-constants';
import { createClient } from '@supabase/supabase-js';

// Pull from Expo constants extra - Direct access without REACT_APP_ prefix
const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  'https://vdqhezlgayacyqrnnoxw.supabase.co';

const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkcWhlemxnYXlhY3lxcm5ub3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MTczNTQsImV4cCI6MjA5MDM5MzM1NH0.itduLJWdF3kBooUPPt4akNTo6vd8cPTofyFubP8Y80Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAuth = {
  async signInWithPhone(phone) {
    if (!phone) throw new Error('Phone number is required for sign-in');
    const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    const { data, error } = await supabase.auth.signInWithOtp({ phone: normalizedPhone });
    if (error) throw error;
    return data;
  },

  async verifyOTP(phone, otp) {
    const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    const { data, error } = await supabase.auth.verifyOtp({ phone: normalizedPhone, token: otp, type: 'sms' });
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  },
};

export const productStore = {
  async getProducts() {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) {
        console.error('Supabase getProducts error:', error.message);
        return null; // Return null to trigger fallback in HomeScreen
      }
      if (!data || !Array.isArray(data)) {
        console.warn('Invalid products data from Supabase');
        return null;
      }
      return data;
    } catch (error) {
      console.error('Supabase getProducts exception:', error);
      return null; // Fallback to demo data
    }
  },

  async getProductById(id) {
    try {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) {
        console.warn('getProductById error:', error.message);
        return null;
      }
      return data;
    } catch (error) {
      console.error('getProductById exception:', error);
      return null;
    }
  },

  async createOrder(order) {
    try {
      const { data, error } = await supabase.from('orders').insert([order]);
      if (error) {
        console.warn('createOrder error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.error('createOrder exception:', error);
      return { success: false, error: error.message };
    }
  },

  async getOrders(userId) {
    try {
      const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
      if (error) {
        console.warn('getOrders error:', error.message);
        return [];
      }
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('getOrders exception:', error);
      return [];
    }
  },

  async createOrUpdateUserProfile(userProfile) {
    try {
      if (!userProfile) {
        console.warn('No user profile to save');
        return { success: false };
      }
      const { data, error } = await supabase
        .from('profiles')
        .upsert(userProfile, { onConflict: 'id' });
      if (error) {
        console.warn('Profile upsert error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.error('Profile upsert exception:', error);
      return { success: false, error: error.message };
    }
  },
};
