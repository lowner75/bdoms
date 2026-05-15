// src/services/biometrics.service.ts

import EncryptedStorage from 'react-native-encrypted-storage';
import * as LocalAuthentication from 'expo-local-authentication';

export async function isBiometricAvailable() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
  const storedUser = await EncryptedStorage.getItem('user');

  return hasHardware && supported.length > 0 && !!storedUser;
}

export async function authenticateBiometric() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Login with biometrics',
    fallbackLabel: 'Enter password',
  });

  return result.success;
}