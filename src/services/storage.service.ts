// src/services/storage.service.ts

import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveAuthToken(token: string) {
  await EncryptedStorage.setItem('authToken', token);
}

export async function getAuthToken(): Promise<string | null> {
  return await EncryptedStorage.getItem('authToken');
}