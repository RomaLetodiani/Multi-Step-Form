import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // uncomment the following line for Debug mode
  // console.error(err.stack);
  let errorMessage = err.message;
  if (err instanceof UserNotFoundError) {
    res.status(404).json({ message: errorMessage });
  } else if (err instanceof AuthenticationError) {
    res.status(400).json({ message: 'Unauthorized: ' + err.message });
    errorMessage = 'Unauthorized: ' + err.message;
  } else if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message, field: err.field });
    errorMessage = 'Validation Error: ' + err.message;
  } else if (err instanceof UserRegistrationError) {
    res.status(401).json({ message: err.message });
    errorMessage = 'User registration Error: ' + err.message;
  } else if (err instanceof UserLoginError) {
    res.status(401).json({ message: err.message });
    errorMessage = 'User Login Error: ' + err.message;
  } else if (err instanceof UserLogoutError) {
    res.status(401).json({ message: err.message });
    errorMessage = 'User Logout Error: ' + err.message;
  } else {
    res.status(500).json({ message: 'Internal Server Error ' });
  }
  console.error(errorMessage);
};

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class UserRegistrationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserCreationError';
  }
}

class UserLoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserLoginError';
  }
}

class UserLogoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserLogoutError';
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User Not Found');
    this.name = 'UserNotFoundError';
  }
}

export {
  errorHandler,
  AuthenticationError,
  ValidationError,
  UserRegistrationError,
  UserLoginError,
  UserLogoutError,
  UserNotFoundError,
};
