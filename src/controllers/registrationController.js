import showToast from '../components/toast'
import {
  isEmailValid,
  isNonEmptyField,
  isPasswordValid
} from '../utils/validations'
import languagekeys from '../localization/languagekeys'
import LanguageUtils from '../localization/languageUtils'
const handleRegistration = async (
  email,
  password,
  cpassword,
  name,
  navigation
) => {
  if (
    !isNonEmptyField(email) ||
    !isNonEmptyField(password) ||
    !isNonEmptyField(cpassword) ||
    !isNonEmptyField(name)
  ) {
    showToast(LanguageUtils.getLangText(languagekeys.allfields))
  } else if (!isEmailValid(email)) {
    showToast(LanguageUtils.getLangText(languagekeys.invalidemail))
  } else if (!isPasswordValid(password)) {
    showToast(LanguageUtils.getLangText(languagekeys.validpassword))
  } else if (password !== cpassword) {
    showToast(LanguageUtils.getLangText(languagekeys.matchpassword))
  } else {
    navigation.navigate('Login')
  }
}

export default handleRegistration
