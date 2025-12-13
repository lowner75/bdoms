// src/constants/theme.ts ...

import { Platform } from 'react-native';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme, Theme as NavigationTheme } from '@react-navigation/native';

// Base colors
const accentColor = "#ffaf1b";
const accentColorMuted = "#ff8c0e";
const tintColorLight = '#11181C';
const tintColorDark = '#FFFFFF';
const redColor = '#e43a36';

export const Colors = {
  light: {
    // General
    accentColor: accentColor,
    accentColorMuted: accentColorMuted,
    tintColor: tintColorLight,
    redColor: redColor,
    backgroundColor: '#FFFFFF',
    textColor: '#11181C',
    borderColor: '#E2E2E2',
    iconColor: '#adadadff',
    
    // Card
    cardBackgroundColor: '#FFFFFF',
    cardBackgroundColorDarker: '#F9F9F9',
    cardHeaderBackgroundColor: '#F2F2F2',
    cardHeaderTextColor: '#11181C',
    cardBodyBackgroundColor: '#FFFFFF',
    cardBodyTextColor: '#11181C',
    cardBorderColor: '#E2E2E2',
    cardShadowColor: '#00000033',

    // Buttons
    buttonBackgroundColor: '#E8E8E8',
    buttonTextColor: '#ffffffff',
    buttonDisabledBackgroundColor: '#CCCCCC',
    buttonDisabledTextColor: '#888888',

    // Navigation
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    tabBarBackground: '#F2F2F2',
    headerBackground: '#F2F2F2',
  },
  dark: {
    // General
    accentColor: accentColor,
    accentColorMuted: accentColorMuted,
    tintColor: tintColorDark,
    redColor: redColor,
    backgroundColor: '#151718',
    textColor: '#ECEDEE',
    borderColor: '#4f5257ff',
    iconColor: '#666666ff',
    
    // Card
    cardBackgroundColor: '#222527ff',
    cardBackgroundColorDarker: '#1b1e1fff',
    cardHeaderBackgroundColor: '#101112',
    cardHeaderTextColor: '#ECEDEE',
    cardBodyBackgroundColor: '#1b1e1fff',
    cardBodyTextColor: '#ECEDEE',
    cardBorderColor: '#4f5257ff',
    cardShadowColor: '#00000099',

    // Buttons
    buttonBackgroundColor: '#26292bff',
    buttonTextColor: '#ffffffff',
    buttonDisabledBackgroundColor: '#4f5257ff',
    buttonDisabledTextColor: '#888888',
    
    // Navigation
    tabIconDefault: '#b6b6b6ff',
    tabIconSelected: tintColorDark,
    tabBarBackground: '#101112',
    headerBackground: '#101112',
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
      // Default colours required for React Navigation components
      background: colors.backgroundColor,
      card: colors.cardBackgroundColor,
      text: colors.textColor,
      border: colors.borderColor,
      primary: colors.tintColor,
      notification: colors.tintColor,
    },
  };
};