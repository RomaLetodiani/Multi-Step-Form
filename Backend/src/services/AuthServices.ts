import { Request, Response } from 'express';
import { User } from '../models/User';
import {
  UserRegistrationError,
  UserLoginError,
} from '../middlewares/errorMiddleware';
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from '../utils/validation';
import { clearToken, generateToken } from '../utils/auth';

class AuthServices {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // Validations
    await validateEmail(email);
    await validatePassword(password);
    await validateUsername(username);

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new UserRegistrationError('User already exists');
    }

    const newUser = await User.create({
      username,
      email,
      password,
      verified: false,
    });

    if (newUser) {
      generateToken(res, newUser._id);
    } else {
      throw new UserRegistrationError('Could not Generate Token');
    }

    return newUser;
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validations
    await validateEmail(email);
    await validatePassword(password);

    const user = await User.findOne({ email });

    if (!user) {
      throw new UserLoginError('User not found');
    }

    if (!(await user.comparePassword(password))) {
      throw new UserLoginError('Incorrect Password');
    }

    generateToken(res, user._id);
    return user;
  }
  async logout(res: Response) {
    clearToken(res);
  }
}

export default AuthServices;
