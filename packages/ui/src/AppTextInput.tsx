import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';

type Props = React.ComponentProps<typeof TextInput>;

export const AppTextInput: React.FC<Props> = (props) => {
  return <TextInput {...props} style={[styles.input, props.style]} />;
};

const styles = StyleSheet.create({
  input: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1 }
});
