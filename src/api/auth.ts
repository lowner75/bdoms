// src/api/auth.ts

import API, { clearTokens } from './client';
import EncryptedStorage from 'react-native-encrypted-storage';

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
  }
}