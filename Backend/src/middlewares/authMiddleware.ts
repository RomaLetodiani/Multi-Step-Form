import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import { AuthenticationError } from './errorMiddleware'
import { User } from '../models/User'
import { getToken } from '../utils/auth'

export const authenticateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenId = req.cookies.token_id

      if (!tokenId) {
        throw new AuthenticationError('Token is required')
      }

      const token = getToken(tokenId)
      if (!token) {
        throw new AuthenticationError('Invalid token')
      }

      const jwtSecret = process.env.JWT_SECRET_KEY || ''
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload

      if (!decoded || !decoded.userId) {
        throw new AuthenticationError('User not found')
      }

      const user = await User.findById(
        decoded.userId,
        '_id username email verified subscription',
      ).populate('subscription')

      if (!user) {
        throw new AuthenticationError('User not found')
      }

      res.user = user
      next()
    } catch (err) {
      if (err instanceof AuthenticationError) {
        return next(err)
      } else {
        console.log(err)
        throw new AuthenticationError('Invalid token')
      }
    }
  },
)
