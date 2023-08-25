import { isNonEmptyField, isPasswordValid } from '../utils/validations'
import showToast from '../components/toast'
const handleChangePassword = async (
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  setMenuVisiblilty
) => {
  console.log(oldPassword, newPassword, confirmPassword)
  if (
    !isNonEmptyField(oldPassword) ||
    !isNonEmptyField(newPassword) ||
    !isNonEmptyField(confirmPassword)
  ) {
    showToast('All fields are required')
  } else if (newPassword !== confirmPassword) {
    showToast("Password and confirm password doesn't match")
  } else if (!isPasswordValid(newPassword)) {
    showToast('Password validation failed')
    setMenuVisiblilty(true)
  } else {
    console.log('7crore')
    setMenuVisiblilty(false)
    showToast('Password changed successfully!')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
}

export default handleChangePassword
