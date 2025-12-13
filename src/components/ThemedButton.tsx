// src/components/ThemedButton.tsx

// Dependencies ...
import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

export type ThemedButtonProps = PressableProps & {
  title: string;
  icon?: React.ReactNode;
  type?: 'primary' | 'accent' | 'danger' | 'link';
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
};

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  icon,
  type = 'primary',
  style,
  textStyle,
  ...rest
}) => {
  const { colors } = useAppTheme();

  // Define themed styles for each type
  const typeStyles = {
    primary: {
      backgroundColor: colors.buttonBackgroundColor,
      textColor: colors.textColor,
    },
    accent: {
      backgroundColor: colors.accentColor,
      textColor: colors.textColor,
    },
    danger: {
      backgroundColor: '#D9534F',
      textColor: '#fff',
    },
    link: {
      backgroundColor: 'transparent',
      textColor: colors.accentColor,
    },
  };

  const selected = typeStyles[type];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.baseButton,
        {
          backgroundColor: selected.backgroundColor,
        },
        pressed && type !== 'link' ? { opacity: 0.8 } : null,
        style,
      ]}
      {...rest}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
        {title && <Text style={[styles.baseText, { color: selected.textColor }, type === 'link' && styles.linkText, textStyle]}>{title}</Text>}
      </View>
    </Pressable>
  );
};

// Styles ...
const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '500',
  },
});