import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Colors from '../Assets/Style/Color';

const CustomTextInput = ({
  label,
  icon,
  placeholder,
  required,
  iconColor,
  error,
  errorMessage,
  containerStyle,
  inputStyle,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </Text>
      )}

      <TextInput
        mode="outlined"
        style={[
          styles.input,
          error && styles.inputError,
          inputStyle, // 👈 allow parent to override or add styles
        ]}
        placeholder={placeholder}
        textColor={Colors.white_text_color}
        placeholderTextColor="#888888FF"
        left={
          icon ? (
            <TextInput.Icon
              icon={icon}
              color={iconColor || Colors.blue_theme_Color}
            />
          ) : null
        }
        error={!!error}
        {...props}
      />

      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: Colors.white_text_color,
    marginBottom: 4,
  },
  asterisk: {
    color: 'red',
  },
  input: {
    backgroundColor: Colors.black_bg_Theme,
    height: 50,
    color: Colors.white_text_color,
  },
  inputError: {
    borderWidth: 0.7,
    borderColor: 'red',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTextInput;
