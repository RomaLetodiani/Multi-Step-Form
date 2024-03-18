import { Request, Response } from 'express'
import { User } from '../models/User'
import { UserRegistrationError, UserLoginError } from '../middlewares/errorMiddleware'
import { validateEmail, validateUsername, validatePassword } from '../utils/validation'
import { clearToken, generateToken } from '../utils/auth'

class AuthServices {
  async register(req: Request, res: Response) {
    const { username, email, password } = req.body

    // Validations
    await validateUsername(username)

    const userExists = await User.findOne({ username })
    if (userExists) {
      throw new UserRegistrationError('User already exists')
    }

    await validatePassword(password)
    await validateEmail(email)

    const newUser = await User.create({
      username,
      email,
      password,
    })

    if (newUser) {
      generateToken(res, newUser._id)
    } else {
      throw new UserRegistrationError('Could not Generate Token')
    }

    return newUser
  }
  async login(req: Request, res: Response) {
    const { username, password } = req.body

    // Validations
    await validateUsername(username)

    const user = await User.findOne({ username })
    if (!user) {
      throw new UserLoginError('User not found')
    }

    if (!(await user.comparePassword(password))) {
      throw new UserLoginError('Incorrect Password')
    }

    generateToken(res, user._id)
    return user
  }
  async logout(res: Response) {
    clearToken(res)
  }
}

export default AuthServices
