// src/screens/LoginScreen.tsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Switch, View } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedInput } from '../components/ThemedInput';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../services/auth.service';
import { AlertModal } from '../components/AlertModal';
import { useAuth } from '../context/AuthContext';
import { loginWithBiometrics } from '../services/auth.service';

export default function LoginScreen() {
  const { colors, theme } = useAppTheme();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertData, setAlertData] = useState<{ title?: string; message: string } | null>(null);

  const logoDark = require('../../assets/adaptive-icon-cropped.png');
  const logoLight = require('../../assets/adaptive-icon-cropped-light.png');

  useEffect(() => {
    async function tryBiometricAutoLogin() {
      const user = await loginWithBiometrics();
      if (user) setUser(user);
    }

    tryBiometricAutoLogin();
  }, []);

  async function handleLogin() {
    try {
      const user = await login(email, password);
      setUser(user);
    } catch (err: any) {
      setAlertData({ title: 'Login Failed', message: err.message || 'An error occurred' });
    }
  }

  return (
    <ScreenWrapper>
      <ThemedView style={styles.loginContainer}>

        <Image
          source={theme === 'dark' ? logoDark : logoLight}
          style={styles.logo}
          resizeMode="contain"
        />

        <ThemedText type="title" style={styles.title}>BDOMS</ThemedText>

        <ThemedInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <ThemedInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <ThemedButton
          title="Login"
          icon={<Ionicons name="log-in-outline" size={24} color={colors.textColor} style={{ marginRight: 8 }} />}
          type="primary"
          style={{ width: '100%' }}
          onPress={handleLogin}
        />
      </ThemedView>

      <AlertModal
        visible={!!alertData}
        title={alertData?.title}
        message={alertData?.message ?? ""}
        buttons={[{ text: 'OK', onPress: () => setAlertData(null) }]}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 48,
  },
  title: {
    marginBottom: 48,
  },
});