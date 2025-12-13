// src/components/AlertModal.tsx

import React from 'react';
import { Modal, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { ThemedButton } from './ThemedButton';

interface AlertButton {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'accent' | 'danger' | 'link';
}

interface AlertModalProps {
  visible: boolean;
  title?: string;
  message: string;
  buttons?: AlertButton[];
  onClose?: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: 'OK', onPress: () => {} }],
  onClose,
}) => {
  const { colors } = useAppTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.overlay}>
        <ThemedView style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
          
          {title && (
            <ThemedText style={[styles.title, { color: colors.textColor }]}>
              {title}
            </ThemedText>
          )}

          <ThemedText style={[styles.message, { color: colors.textColor }]}>
            {message}
          </ThemedText>

          <ThemedView style={styles.buttonColumn}>
            {buttons.map((btn, idx) => (
              <ThemedButton
                key={idx}
                title={btn.text}
                type={btn.type || 'primary'}
                onPress={btn.onPress}
                style={[styles.button, btn.style]}
              />
            ))}
          </ThemedView>

        </ThemedView>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 24,
  },
  buttonColumn: {
    width: '100%',
    gap: 10,
  },
  button: {
    alignSelf: 'stretch',
    paddingVertical: 14,
  },
});