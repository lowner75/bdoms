// App.tsx

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/hooks/useAppTheme';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useEffect } from 'react';
import { useAppTheme } from './src/hooks/useAppTheme';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const { colors, theme } = useAppTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.backgroundColor);
      NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');      
    }
  }, [colors.backgroundColor, theme]);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}