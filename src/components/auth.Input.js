import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import Colors from '../constants/colors'
import Font from '../constants/fonts'

const AuthInput = ({ email, setEmail, password, setPassword }) => {
  const [focused, setFocused] = useState(false)
  const [passWordFocus, setPassWordFocus] = useState(false)
  return (
    <View style={styles.view}>
      <TextInput
        style={[styles.inputText, focused && styles.focused]}
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
        placeholderTextColor={Colors.darkText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  focused: {
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing
  },
  inputText: {
    width: '100%',
    borderWidth: 0.5,
    fontFamily: Font.REGULAR,
    fontSize: FontSize.small,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing
  },
  view: { width: '100%' }
})
export default AuthInput
