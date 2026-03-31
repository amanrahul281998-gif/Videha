import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import RootNavigator from './src/navigation/RootNavigator';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#667eea', paddingHorizontal: 20 }}>
              <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', marginBottom: 10 }}>
                App encountered an error
              </Text>
              <Text style={{ color: '#fff', fontSize: 14, textAlign: 'center', opacity: 0.8 }}>
                Please restart the application
              </Text>
            </View>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      );
    }

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <CartProvider>
              <RootNavigator />
            </CartProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}

export default function App() {
  return <ErrorBoundary />;
}
