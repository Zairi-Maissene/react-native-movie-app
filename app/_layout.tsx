import { ThemeProvider } from '@react-navigation/native';
import {darkTheme, lightTheme } from '../constants/theme';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import LoaderOverlay from '../components/LoaderOverlay';
import { LoadingProvider } from '../context/LoadingContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
      <LoadingProvider>
        <LoaderOverlay>
          <Stack
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false
              }}
              />
            <Stack.Screen
              name="[id]"
              options={{
                headerShown: false
              }}
              />
          </Stack>
        </LoaderOverlay>
      </LoadingProvider>
    </ThemeProvider>
  );
}
