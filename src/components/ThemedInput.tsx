// src/components/ThemedInput.tsx

import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';

export function ThemedInput(props: TextInputProps) {
  const { colors } = useAppTheme();

  return (
    <TextInput
      {...props}
      placeholderTextColor={colors.text}
      style={[
        styles.input,
        { 
          backgroundColor: colors.background, 
          color: colors.text, 
          borderColor: colors.border 
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
  },
});