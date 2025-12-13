// src/screens/SettingsScreen.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../hooks/useAppTheme';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logout } from '../services/auth.service';
import { AlertModal } from '../components/AlertModal';

export default function SettingsScreen() {
  const { theme, colors, setTheme } = useAppTheme();
  const [isDark, setIsDark] = useState(theme === 'dark');

  const { user, setUser } = useAuth();

  const [ alertData, setAlertData ] = useState<{ title?: string; message: string } | null>(null);

  // Keep local switch state in sync with global theme
  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const handleToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    setTheme(newTheme); // persists to AsyncStorage via your hook
  };

  async function handleLogout() {
    try {
      await logout();  // clears token + user from AsyncStorage
      setUser(null);   // clears AuthContext state
    } catch (err: any) {
      setAlertData({ title: 'Logout failed', message: err.message });
    }
  }

  return (
    <ScreenWrapper>
      <ThemedText type="defaultSemiBold" style={{ marginTop: 20 }}>Your Profile Settings</ThemedText>

      <ThemedView style={{ marginTop: 20, borderBottomWidth: 0.5, borderBottomColor: colors.borderColor, paddingBottom: 10 }}>
        <ThemedText type="label">Full Name:</ThemedText>
        <ThemedText style={{ marginTop: 5 }}>{user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : 'Not Signed In'}</ThemedText>
      </ThemedView>

      <ThemedView style={{ marginTop: 30, borderBottomWidth: 0.5, borderBottomColor: colors.borderColor, paddingBottom: 10 }}>
        <ThemedText type="label">Email Address:</ThemedText>
        <ThemedText style={{ marginTop: 5 }}>{user?.email ?? 'Not Signed In'}</ThemedText>
      </ThemedView>

      <ThemedView style={{ marginTop: 30 }}>
        <ThemedText type="label">Theme:</ThemedText>
      </ThemedView>

      <ThemedView style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.6, borderBottomColor: colors.borderColor, paddingBottom: 10 }}>
          <ThemedText style={{ flex: 1 }}>{isDark ? 'Dark Mode' : 'Light Mode'}</ThemedText>
          <Switch
            value={isDark}
            onValueChange={handleToggle}
              thumbColor={isDark ? colors.accentColorMuted : colors.tabIconDefault} // the circle
            trackColor={{ false: colors.tabIconDefault + '33', true: colors.tabIconSelected + '33' }} // the background track
          />
        </ThemedView>

      <ThemedView style={{ marginTop: 30 }}>
        <ThemedButton
          title="Sign Out"
          textStyle={{ color: colors.buttonTextColor }}
          icon={<Ionicons name="log-out-outline" size={20} color={colors.buttonTextColor} />}
          style={{ backgroundColor: colors.accentColorMuted }}
          type="accent"
          onPress={handleLogout}
        />
      </ThemedView>

      <AlertModal
        visible={!!alertData}
        title={alertData?.title}
        message={alertData?.message ?? ""}
        buttons={[
          { text: 'OK', onPress: () => setAlertData(null) }
        ]}
      />

    </ScreenWrapper>
  );
}