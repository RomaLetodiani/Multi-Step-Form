import { ValidationError } from '../middlewares/errorMiddleware'

const validateEmail = async (email: string) => {
  const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  if (!emailRegex.test(email)) {
    throw new ValidationError('email', 'Please enter a valid email address')
  }
}

const validatePassword = async (password: string) => {
  if (password.length < 8) {
    throw new ValidationError('password', 'Password should be at least 8 characters long')
  }

  if (password.length > 20) {
    throw new ValidationError('password', 'Password should not exceed 20 characters')
  }

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSymbol = /\W/.test(password)

  const missingChars = []
  if (!hasUpperCase) missingChars.push('uppercase letter')
  if (!hasNumber) missingChars.push('number')
  if (!hasLowerCase) missingChars.push('lowercase letter')
  if (!hasSymbol) missingChars.push('symbol')

  if (missingChars.length > 0) {
    throw new ValidationError(
      'password',
      `Strong passwords contain at least one ${missingChars.join(', ')}. Please try again.`,
    )
  }
}

const validateUsername = async (username: string) => {
  if (username.length < 5) {
    throw new ValidationError('username', 'Username should be at least 5 characters long')
  }
  if (username.length > 20) {
    throw new ValidationError('username', 'Username should not exceed 20 characters')
  }
  // Regular expression for allowed characters (alphanumeric and underscores)
  const allowedChars = /^[a-zA-Z0-9_.-]+$/
  if (!allowedChars.test(username)) {
    throw new ValidationError(
      'username',
      'Usernames can only contain letters, numbers, dots, hyphens, underscores',
    )
  }
}

export { validateEmail, validatePassword, validateUsername }
