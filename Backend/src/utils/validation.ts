import { ValidationError } from '../middlewares/errorMiddleware';

export const validateEmail = async (email: string) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('email', 'Invalid email format');
  }
};

// Password should be at least 8 characters long
export const validatePassword = async (password: string) => {
  if (password.length < 8)
    throw new ValidationError(
      'password',
      'Password should be at least 8 characters long'
    );
};

// Name should be at least 5 characters long
export const validateUsername = async (name: string) => {
  if (name.length < 5) {
    throw new ValidationError(
      'username',
      'Username should be at least 5 characters long'
    );
  }
};
