import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import AuthServices from '../services/AuthServices'

class AuthController {
  private readonly authServices: AuthServices

  constructor() {
    this.authServices = new AuthServices()
  }

  checkUser = asyncHandler(async (req: Request, res: Response) => {
    const isAuthenticated = await this.authServices.checkUser(req, res)
    res
      .status(isAuthenticated ? 200 : 404)
      .json({ message: isAuthenticated ? 'User is logged in' : 'Token Required' })
  })

  registerUser = asyncHandler(async (req: Request, res: Response) => {
    await this.authServices.register(req, res)
    res.status(200).json({
      message: 'User registered successfully',
    })
  })

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.authServices.login(req, res)
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    })
  })

  logoutUser = asyncHandler(async (__, res: Response) => {
    await this.authServices.logout(res)
    res.status(200).json({ message: 'User logged out successfully' })
  })
}

export default new AuthController()
