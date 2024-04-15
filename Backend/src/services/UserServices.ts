import { Request, Response } from 'express'
import { User } from '../models/User'
import { clearToken, generateVerificationCode, hashPassword } from '../utils/auth'
import { validateEmail, validateUsername, validatePassword } from '../utils/validation'
import { EmailVerificationError, UserUpdateError } from '../middlewares/errorMiddleware'
import { sendEmail } from '../utils/sendEmail'

class UserServices {
  async getDetails(res: Response) {
    const user = res.user
    return user
  }

  async updateUser(req: Request, res: Response) {
    const { username, email, password } = req.body
    const user = res.user

    // Validations
    await validateEmail(email)
    await validateUsername(username)
    await validatePassword(password)

    const userExists = await User.findOne({
      username,
    })
    if (userExists && user?.username !== username) {
      throw new UserUpdateError('User already exists')
    }

    const hashedPassword = await hashPassword(password)

    await User.findOneAndUpdate(
      { _id: res.user?._id },
      { $set: { username, email, password: hashedPassword } },
      { new: true },
    )
  }
  async deleteUser(res: Response) {
    const user = await User.findOneAndDelete({ _id: res.user?._id })
    clearToken(res)

    return user
  }

  async sendEmail(req: Request, res: Response) {
    const user = await User.findById(res.user?._id)
    if (user?.verified) {
      throw new EmailVerificationError('Email already verified')
    }

    // Check if 30 seconds have passed since the last request
    const now = new Date()
    const lastRequest = user?.verificationCode.lastVerificationRequestAt

    if (lastRequest && now.getTime() - lastRequest.getTime() < 30000) {
      throw new EmailVerificationError(
        'Please wait 30 seconds before sending another verification email',
      )
    }

    const verificationCode = generateVerificationCode()
    const verificationCodeExpiresAt = new Date()
    verificationCodeExpiresAt.setMinutes(verificationCodeExpiresAt.getMinutes() + 5)

    // Update user with new verification information
    if (user) {
      // send verification email
      await sendEmail(user.email, user.username, verificationCode, 'Verify Your Email').catch(
        (error) => {
          throw new EmailVerificationError(error.message)
        },
      )

      user.verificationCode.verificationCode = verificationCode
      user.verificationCode.verificationCodeExpiresAt = verificationCodeExpiresAt
      user.verificationCode.lastVerificationRequestAt = now

      await user.save()
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const user = await User.findById(res.user?._id)
    if (user?.verified) {
      throw new EmailVerificationError('User already verified')
    }

    const { verificationCode } = req.body

    if (!verificationCode) throw new EmailVerificationError('Please provide a verification code')

    const verificationCodeExpiresAt = user?.verificationCode.verificationCodeExpiresAt
    if (!verificationCodeExpiresAt || verificationCodeExpiresAt.getTime() < new Date().getTime()) {
      throw new EmailVerificationError('Verification code has expired')
    }

    const verificationCodeMatches = user?.verificationCode.verificationCode === verificationCode
    if (!verificationCodeMatches) {
      throw new EmailVerificationError('Wrong Verification code')
    }

    user.verified = true
    user.verificationCode = {
      verificationCode: null,
      verificationCodeExpiresAt: null,
      lastVerificationRequestAt: null,
    }

    await user.save()
  }
}

export default UserServices
