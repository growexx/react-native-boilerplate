import { emailRegex, passwordRegex } from './regex.constants'

export const isNonEmptyField = data => {
  return data !== null && data !== undefined && data !== ''
}
export const isEmailValid = enteredEmail => {
  return emailRegex.test(enteredEmail)
}

export const isPasswordValid = password => {
  return passwordRegex.test(password)
}
