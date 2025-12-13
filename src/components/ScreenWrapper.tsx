// src/components/ScreenWrapper.tsx

// Dependencies ...
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedView } from './ThemedView';

interface ScreenWrapperProps {
  children: React.ReactNode;
  noTopPadding?: boolean;
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle | ViewStyle[];
}

export function ScreenWrapper({
  children,
  noTopPadding = false,
  lightColor,
  darkColor,
  style,
}: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  const { theme, colors } = useAppTheme();

  const backgroundColor =
    theme === 'dark' ? darkColor ?? colors.backgroundColor : lightColor ?? colors.backgroundColor;

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor,
        },
        style,
      ]}
    >
      <StatusBar
        style={theme === 'dark' ? 'light' : 'dark'}
        backgroundColor={backgroundColor} // Android
        translucent={false}
      />
      {children}
    </ThemedView>
  );
};

// Styles ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});