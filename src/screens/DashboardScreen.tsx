// src/screens/DashboardScreen.tsx

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';

export default function DashboardScreen() {
  const { colors, theme } = useAppTheme();
  const { user, setUser } = useAuth();
  const insets = useSafeAreaInsets();

  const logoDark = require('../../assets/adaptive-icon-cropped.png');
  const logoLight = require('../../assets/adaptive-icon-cropped-light.png');

  return (
    <ScreenWrapper>

      <ThemedView style={[styles.headerRow, { marginTop: 64 }]}>
        <Image
          source={theme === 'dark' ? logoDark : logoLight}
          style={styles.logo}
          resizeMode="contain"
        />
        <ThemedText type="title" style={styles.headerTitle}>
          BDOMS
        </ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText>Hi {user?.firstName ?? 'Guest'}, welcome to BDOMS.</ThemedText>
      </ThemedView>

    </ScreenWrapper>
  );

}

const styles = StyleSheet.create({
  logo: {
    width: 45,
    height: 45,
    marginBottom: 24,
    marginRight: 8,
  },
  headerRow: {
    flexDirection: 'row', // side by side
    alignItems: 'center', // vertically center
  },
  headerTitle: {
    marginLeft: 12, // spacing between logo and title
    marginTop: 8,
  },
});