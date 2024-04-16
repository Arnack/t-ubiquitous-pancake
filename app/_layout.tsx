import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/utilities/context/theme-context';
import { AppContextProvider } from '@/utilities/context/app-context';

export {
  ErrorBoundary,
} from 'expo-router';

import { ToastProvider } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "SpaceMono-Regular": require('../assets/fonts/SpaceMono-Regular.ttf'),
    "SpaceMono-SemiBold": require('../assets/fonts/SpaceMono-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Error Boundaries
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const RootLayoutNav = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    setLoading(false);
    SplashScreen.hideAsync();
  };

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading...</Text></View>;
  }

  return (
    <ToastProvider offset={30}>
      <ThemeProvider>
        <AppContextProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="edit-product" options={{ headerShown: false }} />
            <Stack.Screen name="view-order" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ presentation: 'modal', headerShown: false }} />
          </Stack>
        </AppContextProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}
