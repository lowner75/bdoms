// src/constants/theme.ts ...

import { Platform } from 'react-native';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from '@react-navigation/native';

// Base colors
const tintColorLight = '#11181C';
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    accent: "#ffaf1b",
    text: '#11181C',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tabBarBackground: '#F2F2F2',
    headerBackground: '#F2F2F2',
    border: '#E2E2E2',
    buttonColor: '#E8E8E8',
  },
  dark: {
    accent: "#ffaf1b",
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#666666ff',
    tabIconDefault: '#b6b6b6ff',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#101112',
    headerBackground: '#101112',
    border: '#4f5257ff',
    buttonColor: '#26292bff',
  },
};

// Type-safe theme keys
export type ThemeType = keyof typeof Colors;

// Fonts
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'sans-serif-rounded',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
});

// Hook for theme colors – default dark
export const useThemeColors = () => {
  return Colors.dark; // always dark by default
};

// Hook for React Navigation theme integration – default dark
export const useNavigationTheme = (): NavigationTheme => {
  const colors = Colors.dark;

  return {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: colors.background,
      primary: colors.tint,
      card: colors.headerBackground,
      text: colors.text,
      border: colors.tabBarBackground,
      notification: colors.tint,
    },
  };
};