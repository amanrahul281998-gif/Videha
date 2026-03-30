import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await logout();
            navigation.replace('Splash');
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const MenuItem = ({ icon, label, onPress, hasArrow = true, danger = false }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuIconContainer}>
        <MaterialIcons
          name={icon}
          size={22}
          color={danger ? '#ff6b6b' : '#667eea'}
        />
      </View>
      <Text style={[styles.menuLabel, danger && styles.dangerText]}>
        {label}
      </Text>
      {hasArrow && (
        <MaterialIcons name="chevron-right" size={24} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.phoneNumber?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.phoneNumber ? `+91 ${user.phoneNumber}` : 'Guest User'}
            </Text>
            <Text style={styles.userMember}>
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <MenuItem
            icon="person"
            label="My Profile"
            onPress={() => Alert.alert('Profile', 'Profile details will be shown here')}
          />
          <MenuItem
            icon="location-on"
            label="Addresses"
            onPress={() => Alert.alert('Addresses', 'Your saved addresses will appear here')}
          />
          <MenuItem
            icon="payment"
            label="Payment Methods"
            onPress={() => Alert.alert('Payment', 'Saved payment methods will appear here')}
          />
        </View>

        {/* Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDERS</Text>
          <MenuItem
            icon="shopping-bag"
            label="My Orders"
            onPress={() => Alert.alert('Orders', 'Your order history will appear here')}
          />
          <MenuItem
            icon="track-changes"
            label="Track Orders"
            onPress={() => Alert.alert('Tracking', 'You have no active orders')}
          />
          <MenuItem
            icon="history"
            label="Return History"
            onPress={() => Alert.alert('Returns', 'No return history available')}
          />
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <MenuItem
            icon="favorite"
            label="Wishlist"
            onPress={() => Alert.alert('Wishlist', 'Your wishlist items will appear here')}
          />
          <MenuItem
            icon="notifications"
            label="Notifications"
            onPress={() => Alert.alert('Notifications', 'Notification preferences')}
          />
          <MenuItem
            icon="language"
            label="Language & Region"
            onPress={() => Alert.alert('Language', 'Current: English')}
          />
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <MenuItem
            icon="help-outline"
            label="Help Center"
            onPress={() => Alert.alert('Help', 'Help articles and FAQs')}
          />
          <MenuItem
            icon="mail"
            label="Contact Us"
            onPress={() => Alert.alert('Contact', 'support@videh.com')}
          />
          <MenuItem
            icon="gavel"
            label="Terms & Conditions"
            onPress={() => Alert.alert('Terms', 'Terms & Conditions content')}
          />
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <MenuItem
            icon="logout"
            label="Logout"
            onPress={handleLogout}
            hasArrow={false}
            danger={true}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>VIDEH</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2026 Videh. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  userInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userMember: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  section: {
    marginBottom: 8,
    backgroundColor: '#fff',
    marginHorizontal: 0,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  dangerText: {
    color: '#ff6b6b',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  version: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 11,
    color: '#ccc',
  },
});

export default ProfileScreen;
