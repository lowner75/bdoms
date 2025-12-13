// src/services/auth.service.ts

import API from '../api/client';
import EncryptedStorage from 'react-native-encrypted-storage';
import { setTokens, clearTokens } from '../api/client';
import { isBiometricAvailable, authenticateBiometric } from './biometrics.service';

// --------------------
// Standard Email/Password Login
// --------------------

export async function login(
  email: string,
  password: string,
  useBiometric: boolean = false
) {
  const response = await API.post('/login', { email, password });

  const { token, refreshToken, user } = response.data;

  // Save tokens securely
  await setTokens(token, refreshToken);

  // Save user for biometric login
  await EncryptedStorage.setItem('user', JSON.stringify(user));

  return user;
}

// --------------------
// Biometric Login
// --------------------

export async function loginWithBiometrics() {
  const available = await isBiometricAvailable();
  if (!available) return null;

  const authenticated = await authenticateBiometric();
  if (!authenticated) return null;

  const accessToken = await EncryptedStorage.getItem('accessToken');
  const refreshToken = await EncryptedStorage.getItem('refreshToken');
  const userStr = await EncryptedStorage.getItem('user');

  if (!accessToken || !refreshToken || !userStr) return null;

  // Re-set tokens in API client to resume authenticated session
  await setTokens(accessToken, refreshToken);

  return JSON.parse(userStr);
}

// --------------------
// Logout
// --------------------

export async function logout() {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (refreshToken) {
      await API.post('/logout', { refreshToken });
    }
  } catch (error) {
    console.log('Logout error:', error);
  } finally {
    await clearTokens();
    await EncryptedStorage.removeItem('user');
    await EncryptedStorage.removeItem('biometricEnabled');
  }
}

// --------------------
// Helper: Check if Biometrics are Enabled
// --------------------

export async function isBiometricEnabled() {
  const enabled = await EncryptedStorage.getItem('biometricEnabled');
  return enabled === 'true';
}

// --------------------
// Optional: Enable Biometric Login
// --------------------

export async function enableBiometricLogin() {
  const available = await isBiometricAvailable();
  if (!available) return false;

  await EncryptedStorage.setItem('biometricEnabled', 'true');
  return true;
}
