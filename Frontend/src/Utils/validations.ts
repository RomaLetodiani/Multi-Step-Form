export const validatePassword = (password: string) => {
  if (password.length < 8) {
    return 'Should be at least 8 characters long'
  }

  if (password.length > 20) {
    return 'Should not exceed 20 characters'
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSymbol = /\W/.test(password)

  const missingChars = []
  if (!hasUpperCase) missingChars.push('Uppercase letter')
  if (!hasNumber) missingChars.push('Number')
  if (!hasLowerCase) missingChars.push('Lowercase letter')
  if (!hasSymbol) missingChars.push('Symbol')

  if (missingChars.length > 0) {
    return `Missing ${missingChars.join(', ')}`
  }
}

export const validateUsername = (username: string) => {
  if (username.length < 5) {
    return 'Should be at least 5 characters long'
  }

  if (username.length > 20) {
    return 'Should not exceed 20 characters'
  }
}
