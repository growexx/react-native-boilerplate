import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
  useColorScheme,
  Keyboard
} from 'react-native'
import { colors, fontSize } from '@constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import handleChangePassword from '../../controllers/changePasswordController'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'

const ChangePasswordScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const setMenuVisiblilty = bool => {
    setIsMenuVisible(bool)
  }

  const colorScheme = useColorScheme()

  const styleForInput =
    colorScheme === 'dark' ? [styles.input, styles.inputDark] : styles.input
  const placeholderTextColor =
    colorScheme === 'dark' ? colors.dark.text : colors.light.darkText

  return (
    <SafeAreaView style={styles.container}>
      <View testID="change-password-form" style={styles.innerContainer}>
        <Text
          style={
            colorScheme === 'dark'
              ? [styles.changePasswordText, styles.changePasswordTextDark]
              : styles.changePasswordText
          }>
          {LanguageUtils.getLangText(languagekeys.changePassword)}
        </Text>
        <TextInput
          style={styleForInput}
          onChangeText={setOldPassword}
          value={oldPassword}
          placeholder={LanguageUtils.getLangText(languagekeys.currentPassword)}
          autoComplete="off"
          placeholderTextColor={placeholderTextColor}
          fontSize={fontSize.medium}
          autoCorrect={false}
          testID="old-password-input"
        />
        <View style={styles.menuTextInput}>
          <TextInput
            style={[styleForInput, { flex: 1 }]}
            onChangeText={setNewPassword}
            value={newPassword}
            placeholder={LanguageUtils.getLangText(languagekeys.newPassword)}
            autoComplete="off"
            placeholderTextColor={placeholderTextColor}
            fontSize={fontSize.medium}
            autoCorrect={false}
            secureTextEntry={true}
            testID="new-password-input"
          />
          <TouchableOpacity testID="toggle-button" onPress={toggleMenu}>
            <Icon
              name="info-circle"
              size={30}
              color={
                colorScheme === 'dark' ? colors.light.gray : colors.dark.gray
              }
            />
          </TouchableOpacity>
        </View>
        {isMenuVisible && (
          <Text style={styles.passwordValidationStyle}>
            {LanguageUtils.getLangText(languagekeys.passwordValidation)}
          </Text>
        )}
        <TextInput
          style={styleForInput}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder={LanguageUtils.getLangText(
            languagekeys.confirmNewPassword
          )}
          placeholderTextColor={placeholderTextColor}
          fontSize={fontSize.medium}
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry={true}
          testID="confirm-password-input"
        />
        <TouchableOpacity
          onPress={() => {
            setMenuVisiblilty(false)
            Keyboard.dismiss()
            handleChangePassword(
              oldPassword,
              newPassword,
              confirmPassword,
              setOldPassword,
              setNewPassword,
              setConfirmPassword,
              setMenuVisiblilty
            )
          }}
          testID="submit-button">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
