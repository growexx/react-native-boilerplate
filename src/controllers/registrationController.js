import showToast from '../components/toast'
import {
  isEmailValid,
  isNonEmptyField,
  isPasswordValid
} from '../utils/validations'

const handleRegistration = async (email, password, cpassword, navigation) => {
  if (
    !isNonEmptyField(email) &&
    !isNonEmptyField(password && !isNonEmptyField(cpassword))
  ) {
    showToast('All fields are required field.')
  } else if (!isEmailValid(email)) {
    showToast(
      'You have entered invalid email address, Please, enter a valid email address.'
    )
  } else if (!isPasswordValid(password)) {
    showToast('Please enter a valid password.')
  } else if (password !== cpassword) {
    showToast('Your passwords are not matching.')
  } else {
    navigation.navigate('Login')
  }
}

export default handleRegistration
