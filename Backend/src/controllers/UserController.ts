import asyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import UserServices from '../services/UserServices'
const userServices = new UserServices()

class UserController {
  // Method for getting user details
  getUserDetails = asyncHandler(async (__, res: Response) => {
    const user = await userServices.getDetails(res)
    res.status(200).json({ message: 'User details', user })
  })

  // Method for updating a user
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const updatedUser = await userServices.updateUser(req, res)
    res.status(200).json({ message: 'User updated successfully', updatedUser })
  })

  // Method for deleting a user
  deleteUser = asyncHandler(async (__, res: Response) => {
    await userServices.deleteUser(res)
    res.status(200).json({ message: 'User deleted successfully' })
  })

  // Method for sending an email
  sendEmail = asyncHandler(async (req: Request, res: Response) => {
    await userServices.sendEmail(req, res)
    res.status(200).json({ message: 'Email sent successfully' })
  })

  // Method for Email Verification
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    await userServices.verifyEmail(req, res)
    res.status(200).json({ message: 'Email verified successfully' })
  })
}

export default UserController
