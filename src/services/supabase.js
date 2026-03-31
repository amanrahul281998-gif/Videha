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
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Supabase getProducts error:', error);
      throw error;
    }
    return data;
  },

  async getProductById(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },

  async createOrder(order) {
    const { data, error } = await supabase.from('orders').insert([order]);
    if (error) throw error;
    return data;
  },

  async getOrders(userId) {
    const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async createOrUpdateUserProfile(userProfile) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert(userProfile, { onConflict: 'id' });
    if (error) throw error;
    return data;
  },
};
