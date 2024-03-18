import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import UserServices from '../services/UserServices'

class UserController {
  private readonly userServices: UserServices

  constructor() {
    this.userServices = new UserServices()
  }
  // Method for getting user details
  getUserDetails = asyncHandler(async (__, res: Response) => {
    const user = await this.userServices.getDetails(res)
    res.status(200).json({ message: 'User details', user })
  })

  // Method for updating a user
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await this.userServices.updateUser(req, res)
    res.status(200).json({ message: 'User updated successfully', updatedUser })
  })

  // Method for deleting a user
  deleteUser = asyncHandler(async (__, res: Response) => {
    await this.userServices.deleteUser(res)
    res.status(200).json({ message: 'User deleted successfully' })
  })

  // Method for sending an email
  sendEmail = asyncHandler(async (req: Request, res: Response) => {
    await this.userServices.sendEmail(req, res)
    res.status(200).json({ message: 'Email sent successfully' })
  })

  // Method for Email Verification
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    await this.userServices.verifyEmail(req, res)
    res.status(200).json({ message: 'Email verified successfully' })
  })
}

export default UserController
