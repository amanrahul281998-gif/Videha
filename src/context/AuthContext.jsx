import React, { createContext, useContext, useState, useCallback } from 'react';
import { storage } from '../services/storage';
import { supabaseAuth, productStore } from '../services/supabase';
import { otpService } from '../services/otpService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const sendOTP = useCallback(async (phone) => {
    setLoading(true);
    try {
      if (!phone || phone.length < 10) {
        throw new Error('Invalid phone number');
      }

      const normalizedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
      
      // Generate OTP using the service
      const generatedOTP = otpService.generateOTP();
      setOtp(generatedOTP);

      // Send OTP via Fast2SMS
      try {
        const result = await otpService.sendOTP(phone, generatedOTP);
        console.log('OTP sent successfully:', result);
      } catch (error) {
        console.warn('Failed to send SMS via Fast2SMS:', error);
        // Continue with demo mode if SMS fails
      }

      const newSessionId = Math.random().toString(36).substr(2, 9);
      await storage.setItem(`phone_${newSessionId}`, normalizedPhone);
      await storage.setItem(`otp_${newSessionId}`, generatedOTP);

      setPhoneNumber(normalizedPhone);
      setSessionId(newSessionId);
      setOtpSent(true);

      return {
        success: true,
        otp: generatedOTP,
        sessionId: newSessionId,
      };
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyOTP = useCallback(async (enteredOtp, sessionIdToVerify = sessionId) => {
    setLoading(true);
    try {
      const storedPhone = await storage.getItem(`phone_${sessionIdToVerify}`);
      if (!storedPhone) {
        throw new Error('Session expired. Please request a new OTP.');
      }

      const storedOtp = await storage.getItem(`otp_${sessionIdToVerify}`);
      
      // Verify OTP
      if (enteredOtp !== storedOtp) {
        throw new Error('Invalid OTP. Please try again.');
      }

      let data = { user: { id: null }, session: { access_token: null } };
      
      try {
        const result = await supabaseAuth.verifyOTP(storedPhone, enteredOtp);
        if (result?.user) {
          data.user = result.user;
        }
        if (result?.session) {
          data.session = result.session;
        }
      } catch (error) {
        console.warn('Supabase verification failed, using demo verification:', error);
      }

      const userData = {
        id: data.user?.id || Math.random().toString(36).substr(2, 9),
        phoneNumber: storedPhone,
        email: data.user?.email || null,
        provider: 'supabase',
        createdAt: new Date().toISOString(),
      };

      await storage.setItem('user', JSON.stringify(userData));
      await storage.setItem('authToken', data.session?.access_token || `token_${Math.random().toString(36).substr(2, 9)}`);

      setUser(userData);
      setOtpSent(false);
      setOtp('');

      // Attempt to create/update user profile (non-critical - continue even if fails)
      try {
        const profileResult = await productStore.createOrUpdateUserProfile({
          id: userData.id,
          phone_number: userData.phoneNumber,
          email: userData.email,
        });
        if (!profileResult.success) {
          console.warn('Profile creation warning:', profileResult.error);
        }
      } catch (profileError) {
        console.warn('Profile creation failed (non-critical):', profileError);
      }

      await storage.removeItem(`phone_${sessionIdToVerify}`);

      return { success: true, user: userData };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const logout = useCallback(async () => {
    try {
      await storage.removeItem('user');
      await storage.removeItem('authToken');
      setUser(null);
      setPhoneNumber('');
      setOtp('');
      setOtpSent(false);
      setSessionId('');
      return { success: true };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const userData = await storage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking auth status:', error);
      return false;
    }
  }, []);

  const value = {
    user,
    loading,
    phoneNumber,
    otp,
    otpSent,
    sessionId,
    sendOTP,
    verifyOTP,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
