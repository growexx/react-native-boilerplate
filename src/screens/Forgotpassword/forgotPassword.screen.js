import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme
} from 'react-native'
import { isEmailValid } from '../../utils/validations'
import showToast from '../../components/toast'
import { strings } from '@i18n'
import colors from '../../constants/colors'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'

const ForgotPasswordScreen = ({ navigation }) => {
  const colorScheme = useColorScheme()
  const [email, setEmail] = useState('')
  return (
    <View style={styles.container}>
      <Text style={colorScheme === 'dark' ? styles.titleDark : styles.title}>
        {LanguageUtils.getLangText(languagekeys.forgotPassword)}
      </Text>
      <TextInput
        testID="email-input"
        style={styles.input}
        placeholder={strings('auth.email-placeholder')}
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        testID="submit"
        style={styles.button}
        onPress={() => {
          if (email === '') {
            showToast('Email field is required.')
          } else if (isEmailValid(email)) {
            showToast(
              'Email has been sent successfully.Please Check your inbox .'
            )
            setTimeout(() => {
              navigation.navigate('Login')
            }, 2000)
          } else {
            showToast(
              'You have entered invalid email address, Please, enter a valid email address.'
            )
          }
        }}>
        <Text style={styles.buttonText}>
          {LanguageUtils.getLangText(languagekeys.submit)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="go-back"
        style={styles.link}
        onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>
          {LanguageUtils.getLangText(languagekeys.goBackToLogin)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  titleDark: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: colors.dark.text
  },
  input: {
    paddingVertical: 0,
    paddingLeft: 10,
    height: 40,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 10
  },
  button: {
    height: 40,
    width: '100%',
    backgroundColor: colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 10
  },
  successText: {
    color: 'green',
    marginTop: 10
  },
  link: {
    marginTop: 20
  },
  linkText: {
    color: '#007bff',
    fontSize: 16
  }
})

export default ForgotPasswordScreen
