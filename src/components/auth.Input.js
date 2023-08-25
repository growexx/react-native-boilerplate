import { View, TextInput, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { spacing, fontSize, colors, fonts } from '@constants';

const AuthInput = ({ email, setEmail, password, setPassword }) => {
  const [focused, setFocused] = useState(false)
  const [passWordFocus, setPassWordFocus] = useState(false)
  const colorScheme = useColorScheme
  return (
    <View style={styles.view}>
      <TextInput
        style={[
          colorScheme === 'dark' ? styles.inputTextDark : styles.inputText,
          focused && styles.focused ,  
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter e-mail address"
        autoComplete="email"
        autoCorrect={false}
        inputMode="email"
        keyboardType="email-address"
        testID="email-input"
        placeholderTextColor={colors.darkText}
      />
      <TextInput
        style={[styles.inputText, passWordFocus && styles.focused]}
        onFocus={() => setPassWordFocus(true)}
        onBlur={() => setPassWordFocus(false)}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={true}
        testID="password-input"
        placeholderTextColor={colors.darkText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  focused: {
    borderWidth: 3,
    borderColor: colors.light.primary,
    shadowOffset: { width: 4, height: spacing },
    shadowColor: colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: spacing
  },
  focusedDark: {
    borderWidth: 3,
    borderColor: colors.dark.primary,
    shadowOffset: { width: 4, height: spacing },
    shadowColor: colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: spacing
  },
  inputText: {
    width: '100%',
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.lightPrimary,
    borderRadius: spacing,
    marginVertical: spacing
  },
  inputTextDark: {
    width: '100%',
    borderWidth: 0.5,
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.dark.lightPrimary,
    borderRadius: spacing,
    marginVertical: spacing,
    borderColor: colors.dark.text
  },
  view: { width: '100%' }
})
export default AuthInput
