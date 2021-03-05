export const isValidEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email !== null && email !== undefined && email !== '') {
    return re.test(email)
  } else {
    return false
  }
}

export const isNonEmptyField = data => {
  return data !== null && data !== undefined && data !== ''
}
