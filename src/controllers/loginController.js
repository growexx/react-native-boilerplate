import showToast from '../components/toast'
import { isEmailValid, isNonEmptyField } from '../utils/validations'

const handleLogin = async (email, password) => {
  if (!isNonEmptyField(email) || !isNonEmptyField(password)) {
    showToast('All fields are required field.')
    return false
  } else if (!isEmailValid(email)) {
    showToast(
      'You have entered invalid email address, Please, enter a valid email address.'
    )
    return false
  } else {
    return true
  }
}

export default handleLogin
