// src/components/ThemedView.tsx

// Dependencies ...
import React from 'react';
import { View, ViewProps } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView: React.FC<ThemedViewProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const { theme, colors } = useAppTheme();

  const backgroundColor =
    theme === 'dark' ? darkColor ?? colors.background : lightColor ?? colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;

};