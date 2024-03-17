import jwt from 'jsonwebtoken'
import { Response } from 'express'
import bcrypt from 'bcrypt'
import randomBytes from 'randombytes'

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET_KEY || ''
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: '1h',
  })

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000,
  })
}

const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

function generateVerificationCode(length: number = 6) {
  /** Generates a random alphanumeric code using CSPRNG. */
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  // Generate random bytes using cryptographically secure random number generator
  const randomBytesBuffer = randomBytes(length)

  // Convert each byte to a character index within the character set
  let code = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytesBuffer[i] % characters.length
    code += characters.charAt(randomIndex)
  }

  return code
}

export { generateToken, clearToken, hashPassword, generateVerificationCode }
