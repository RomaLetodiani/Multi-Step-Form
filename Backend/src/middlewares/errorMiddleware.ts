import { NextFunction, Request, Response } from 'express'

// Helper function to generate error responses
const sendErrorResponse = (res: Response, statusCode: number, errorMessage: string) => {
  res.status(statusCode).json({ message: errorMessage })
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // uncomment the following line for Debug mode
  // console.error(err.stack);

  let errorMessage = err.message
  switch (err.name) {
    case 'AuthenticationError':
      sendErrorResponse(res, 401, `Unauthorized: ${errorMessage}`)
      break
    case 'ValidationError':
    case 'UserRegistrationError':
    case 'UserLoginError':
    case 'UserUpdateError':
    case 'EmailVerificationError':
    case 'SubscriptionError':
      sendErrorResponse(res, 400, `${err.name}: ${errorMessage}`)
      break
    default:
      sendErrorResponse(res, 500, 'Internal Server Error')
  }
  console.error(errorMessage)
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthenticationError'
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class UserRegistrationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserCreationError'
  }
}

class UserLoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserLoginError'
  }
}

class UserUpdateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserUpdateError'
  }
}

class EmailVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailVerificationError'
  }
}

class SubscriptionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SubscriptionError'
  }
}

export {
  errorHandler,
  AuthenticationError,
  ValidationError,
  UserRegistrationError,
  UserLoginError,
  UserUpdateError,
  EmailVerificationError,
  SubscriptionError,
}
