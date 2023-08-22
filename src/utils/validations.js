export const isNonEmptyField = data => {
  return data !== null && data !== undefined && data !== ''
}
export const isEmailValid = enteredEmail => {
  const emailRegex =
    /^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/
  return emailRegex.test(enteredEmail)
}

export const isPasswordValid = password => {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/
  return passwordRegex.test(password)
}
