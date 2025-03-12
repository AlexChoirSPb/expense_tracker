export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validatePassword(password) {
  if (password.length < 8) {
    return false
  }

  const onlyEnglishLettersAndNumbers = /^[A-Za-z0-9]+$/
  if (!onlyEnglishLettersAndNumbers.test(password)) {
    return false
  }

  const hasNumber = /\d/
  if (!hasNumber.test(password)) {
    return false
  }

  const hasUppercase = /[A-Z]/
  if (!hasUppercase.test(password)) {
    return false
  }

  return true
}
