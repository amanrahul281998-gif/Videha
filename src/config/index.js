/**
 * Videh E-Commerce Mobile Application
 * Production-ready apparel store with OTP authentication
 * 
 * Features:
 * - OTP-based mobile authentication
 * - Full e-commerce functionality
 * - Shopping cart management
 * - Product browsing with filtering
 * - User profile management
 * - iOS and Android support
 */

import React from 'react';
import { StyleSheet } from 'react-native';

// Export app configuration
export const appConfig = {
  appName: 'Videh',
  version: '1.0.0',
  environment: 'production',
  apiBaseUrl: 'https://api.videh.com', // Update with your API endpoint
  supportEmail: 'support@videh.com',
};

// Color scheme
export const colors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent: '#ff6b6b',
  accentAlt: '#ee5a6f',
  success: '#4CAF50',
  warning: '#FFB800',
  error: '#ff6b6b',
  text: '#333333',
  textLight: '#666666',
  textLighter: '#999999',
  background: '#f8f8f8',
  white: '#ffffff',
  light: '#f0f0f0',
  border: '#e0e0e0',
};

// Global styles
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  shadowMd: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

// OTP Configuration
export const otpConfig = {
  length: 6,
  validity: 10 * 60 * 1000, // 10 minutes in milliseconds
  resendDelay: 30, // seconds
};

// Payment Configuration (when integrating with payment gateway)
export const paymentConfig = {
  supportedMethods: ['card', 'upi', 'wallet'],
  currency: 'INR',
  taxRate: 0.18, // 18% GST
};

export default appConfig;
