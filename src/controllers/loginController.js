import showToast from '../components/toast'
import { isEmailValid, isNonEmptyField } from '../utils/validations'
import languagekeys from '../localization/languagekeys'
import LanguageUtils from '../localization/languageUtils'

const handleLogin = async (email, password) => {
  if (!isNonEmptyField(email) || !isNonEmptyField(password)) {
    showToast(LanguageUtils.getLangText(languagekeys.allfields))
    return false
  } else if (!isEmailValid(email)) {
    showToast(LanguageUtils.getLangText(languagekeys.invalidemail))
    return false
  } else {
    return true
  }
}

export default handleLogin
