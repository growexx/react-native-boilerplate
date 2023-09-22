import { isNonEmptyField, isPasswordValid } from '../utils/validations'
import showToast from '../components/toast'
import languagekeys from '../localization/languagekeys'
import LanguageUtils from '../localization/languageUtils'
const handleChangePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  setMenuVisiblilty
) => {
  if (
    !isNonEmptyField(oldPassword) ||
    !isNonEmptyField(newPassword) ||
    !isNonEmptyField(confirmPassword)
  ) {
    showToast(LanguageUtils.getLangText(languagekeys.allfields))
  } else if (newPassword !== confirmPassword) {
    showToast(LanguageUtils.getLangText(languagekeys.passwordnotmatch))
  } else if (!isPasswordValid(newPassword)) {
    showToast(LanguageUtils.getLangText(languagekeys.passwordfailed))
    setMenuVisiblilty(true)
  } else {
    setMenuVisiblilty(false)
    showToast(LanguageUtils.getLangText(languagekeys.passwordsuccess))
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
}

export default handleChangePassword
