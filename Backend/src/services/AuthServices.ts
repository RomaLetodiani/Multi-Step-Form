import { Request, Response } from 'express'
import { User } from '../models/User'
import { UserRegistrationError, UserLoginError } from '../middlewares/errorMiddleware'
import { validateEmail, validateUsername, validatePassword } from '../utils/validation'
import { clearToken, generateToken, getToken } from '../utils/auth'
import jwt, { JwtPayload } from 'jsonwebtoken'

class AuthServices {
  async checkUser(req: Request, res: Response) {
    const tokenId = req.cookies.token_id

    if (!tokenId) {
      return false
    }

    const token = getToken(tokenId) // Function to retrieve the JWT token from secure storage

    if (!token) {
      return false
    }

    try {
      const jwtSecret = process.env.JWT_SECRET_KEY || ''
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload
      const userId = decoded.userId

      // Retrieve user data from the database or other storage
      const user = await User.findById(userId)

      if (!user) {
        return false
      }

      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body

    // Validations
    await validateUsername(username)

    const userExists = await User.findOne({ username: { $eq: username } })
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

    const user = await User.findOne({ username: { $eq: username } })
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
