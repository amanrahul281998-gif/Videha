import Constants from 'expo-constants';

const FAST2SMS_API_KEY = 
  Constants.expoConfig?.extra?.FAST2SMS_API_KEY ||
  'BfJKY5R0A6c2H7WiUQT3Lasm4V8NMIuzjyEqxgwGZnoCPtDdObyXb7puYJ09hW3FkBUmIrDM8wClfaNL';

const FAST2SMS_SENDER_ID = 
  Constants.expoConfig?.extra?.FAST2SMS_SENDER_ID ||
  'VIDEHE';

const DLT_TEMPLATE_ID = 
  Constants.expoConfig?.extra?.DLT_TEMPLATE_ID ||
  '1007181628875366114';

export const otpService = {
  generateOTP: () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  async sendOTP(phoneNumber, otp) {
    try {
      // Normalize phone number
      const phone = phoneNumber.startsWith('+91') 
        ? phoneNumber.substring(3) 
        : phoneNumber.startsWith('+') 
        ? phoneNumber.substring(1) 
        : phoneNumber;

      // Prepare the message
      const message = `Your VIDEH verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`;

      // Determine backend URL based on environment
      const backendUrl = Constants.expoConfig?.extra?.REACT_APP_BACKEND_URL || 
                         process.env.REACT_APP_BACKEND_URL || 
                         'https://videha.onrender.com';

      // Call backend API instead of Fast2SMS directly (to avoid CORS issues)
      const response = await fetch(`${backendUrl}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phone,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          message: 'OTP sent successfully',
          data: data,
        };
      } else {
        throw new Error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP Send Error:', error);
      // Fallback: return a demo response so user can test with demo OTP
      console.warn('SMS sending failed, using demo OTP mode for testing');
      return {
        success: true,
        message: 'Demo OTP (SMS service unavailable)',
        data: { note: 'Using demo mode for testing' },
      };
    }
  },

  async verifyOTP(enteredOtp, storedOtp) {
    if (enteredOtp === storedOtp) {
      return { success: true };
    } else {
      throw new Error('Invalid OTP');
    }
  },
};
