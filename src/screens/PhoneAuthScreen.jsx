import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

const PhoneAuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [displayedOtp, setDisplayedOtp] = useState('');
  const { sendOTP, verifyOTP, loading } = useAuth();

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const result = await sendOTP(phoneNumber);
      if (result.success) {
        setDisplayedOtp(result.otp);
        setShowOTPInput(true);
        Alert.alert(
          'OTP Sent',
          `An OTP has been sent to +91${phoneNumber}\n\nFor testing, OTP is: ${result.otp}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otpInput.trim()) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    try {
      const result = await verifyOTP(otpInput);
      if (result.success) {
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('MainApp'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  const handleResendOTP = async () => {
    setOtpInput('');
    try {
      const result = await sendOTP(phoneNumber);
      if (result.success) {
        setDisplayedOtp(result.otp);
        Alert.alert(
          'OTP Resent',
          `New OTP has been sent to ${phoneNumber}\n\nOTP: ${result.otp}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
    }
  };

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={styles.title}>
              {showOTPInput ? 'Verify OTP' : 'Login / Register'}
            </Text>
            <Text style={styles.subtitle}>
              {showOTPInput
                ? 'Enter the OTP sent to your phone'
                : 'Enter your phone number to continue'}
            </Text>

            {!showOTPInput ? (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.phoneInputWrapper}>
                    <Text style={styles.countryCode}>+91</Text>
                    <TextInput
                      style={styles.phoneInput}
                      placeholder="Enter 10-digit phone number"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      keyboardType="phone-pad"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      editable={!loading}
                      maxLength={10}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleSendOTP}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a6f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.otpDisplayContainer}>
                  <Text style={styles.otpLabel}>Your OTP:</Text>
                  <View style={styles.otpDisplayBox}>
                    <Text style={styles.otpDisplayText}>{displayedOtp}</Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Enter OTP</Text>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="6-digit OTP"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="number-pad"
                    value={otpInput}
                    onChangeText={setOtpInput}
                    editable={!loading}
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleVerifyOTP}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#ff6b6b', '#ee5a6f']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.buttonText}>
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={handleResendOTP}
                  disabled={loading}
                >
                  <Text style={styles.resendButtonText}>Resend OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.changeNumberButton}
                  onPress={() => {
                    setShowOTPInput(false);
                    setPhoneNumber('');
                    setOtpInput('');
                    setDisplayedOtp('');
                  }}
                  disabled={loading}
                >
                  <Text style={styles.changeNumberButtonText}>Change Phone Number</Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                {showOTPInput
                  ? '⏱️ OTP is valid for 10 minutes'
                  : '🔒 Your data is secure and encrypted'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
  },
  countryCode: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    color: '#fff',
    fontSize: 16,
  },
  otpInput: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 4,
    textAlign: 'center',
  },
  otpDisplayContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  otpLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  otpDisplayBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
  otpDisplayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  button: {
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  resendButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  resendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  changeNumberButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  changeNumberButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 40,
  },
  infoText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default PhoneAuthScreen;
