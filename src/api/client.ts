// src/api/client.ts

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { BASE_URL } from '@env';

const API = axios.create({
  baseURL: `${BASE_URL}`,
});

// --- In-memory access token ---
let accessToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// --------------------------------------------
// Store, load and clear tokens
// --------------------------------------------

export async function setTokens(newAccess: string, newRefresh: string) {
  accessToken = newAccess;
  await EncryptedStorage.setItem('refreshToken', newRefresh);
  const storedRefresh = await EncryptedStorage.getItem('refreshToken');
}

export async function clearTokens() {
  accessToken = null;
  await EncryptedStorage.removeItem('refreshToken');
}

async function getRefreshToken() {
  return await EncryptedStorage.getItem('refreshToken');
}

export function clearAccessTokenOnly() {
  accessToken = null;
}

// --------------------------------------------
// Refresh access token
// --------------------------------------------

export async function refreshAccessToken(): Promise<string | null> {
  
  if (isRefreshing && refreshPromise) {
    return refreshPromise; // wait for ongoing refresh
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return null;

      const response = await API.post('/refresh', { refreshToken });

      const { token: newAccess, refreshToken: newRefresh } = response.data;

      await setTokens(newAccess, newRefresh);

      return newAccess;
    } catch (err) {
      await clearTokens();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// --------------------------------------------
// Request Interceptor
// --------------------------------------------

API.interceptors.request.use(async config => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// --------------------------------------------
// Response Interceptor
// --------------------------------------------

API.interceptors.response.use(
  res => res,

  async error => {
    if (
      error.response?.status === 401 &&
      !error.config.url?.includes('/refresh')
    ) {
      const newAccess = await refreshAccessToken();

      if (newAccess) {
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newAccess}`;
        return API.request(error.config);
      }
    }

    return Promise.reject(error);
  }
);

export default API;