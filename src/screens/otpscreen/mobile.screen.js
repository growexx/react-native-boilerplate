import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme
} from 'react-native'
import React, { useState, useRef } from 'react'
import PhoneInput from 'react-native-phone-number-input'
import showToast from '../../components/toast'
import spacing from '../../constants/spacing'
import fontSize from '../../constants/fontSize'
import colors from '../../constants/colors'
import fonts from '../../constants/fonts'
import LanguageUtils from '../../localization/languageUtils'
import languagekeys from '../../localization/languagekeys'
const PhoneInputScreen = ({ navigation }) => {
  const colorScheme = useColorScheme()
  const [mobile, setMobile] = useState('')
  const phoneInput = useRef()
  return (
    <View style={styles.root}>
      <PhoneInput
        ref={phoneInput}
        placeholder="Enter phone number"
        value={mobile}
        onChangeText={text => {
          setMobile(text)
        }}
        defaultCode="IN"
        withDarkTheme
        containerStyle={
          colorScheme === 'dark' ? styles.phoneInputDark : styles.phoneInput
        }
      />
      <TouchableOpacity
        style={styles.login}
        onPress={() => {
          const val = phoneInput.current?.isValidNumber(mobile)
          if (val) {
            navigation.navigate('signwithotp', { mobile })
          } else if (mobile === '') {
            showToast('All fields are required.')
          } else {
            showToast('Please Enter Valid Phone Number.')
          }
        }}>
        <Text style={styles.login_text}>
          {LanguageUtils.getLangText(languagekeys.submit)}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PhoneInputScreen

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  login: {
    width: '100%',
    padding: spacing * 1.5,
    backgroundColor: colors.light.primary,
    marginVertical: spacing * 0.5,
    borderRadius: spacing,
    shadowColor: colors.light.primary,
    shadowOffset: {
      width: 0,
      height: spacing
    }
  },
  login_dark: {
    width: '100%',
    padding: spacing * 1.5,
    backgroundColor: colors.dark.primary,
    marginVertical: spacing * 0.5,
    borderRadius: spacing,
    shadowColor: colors.dark.primary,
    shadowOffset: {
      width: 0,
      height: spacing
    }
  },
  login_text: {
    fontFamily: fonts.BOLD,
    color: colors.light.onPrimary,
    textAlign: 'center',
    fontSize: fontSize.large
  },
  login_text_dark: {
    fontFamily: fonts.BOLD,
    color: colors.dark.text,
    textAlign: 'center',
    fontSize: fontSize.large
  },
  phoneInput: {
    width: '100%',
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    backgroundColor: colors.light.lightPrimary,
    borderRadius: spacing
  },
  phoneInputDark: {
    width: '100%',
    fontFamily: fonts.REGULAR,
    fontSize: fontSize.small,
    padding: spacing * 1.5,
    color: 'black',
    backgroundColor: colors.light.gray
  }
})
