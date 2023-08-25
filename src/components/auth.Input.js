import { View, TextInput, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import Colors from '../constants/colors'
import Font from '../constants/fonts'

const AuthInput = ({ email, setEmail, password, setPassword }) => {
  const [focused, setFocused] = useState(false)
  const [passWordFocus, setPassWordFocus] = useState(false)
  const colorScheme = useColorScheme()
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
        placeholderTextColor={Colors.darkText}
      />
      <TextInput
        style={[colorScheme === 'dark' ? styles.inputTextDark : styles.inputText, passWordFocus && styles.focused]}
        onFocus={() => setPassWordFocus(true)}
        onBlur={() => setPassWordFocus(false)}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        autoComplete="off"
        autoCorrect={false}
        secureTextEntry={true}
        testID="password-input"
        placeholderTextColor={Colors.darkText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  focused: {
    borderWidth: 3,
    borderColor: Colors.light.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing
  },
  focusedDark: {
    borderWidth: 3,
    borderColor: Colors.dark.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing
  },
  inputText: {
    width: '100%',
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    // backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing
  },
  inputTextDark: {
    width: '100%',
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    // backgroundColor: Colors.dark.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
    borderColor: "white"
  },
  view: { width: '100%' }
})
export default AuthInput
