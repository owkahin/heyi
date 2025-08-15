import * as React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const AppButton: React.FC<Props> = ({ title, onPress, disabled }) => {
  return (
    <Pressable style={[styles.btn, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', borderWidth: 1 },
  txt: { fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.5 }
});
