import jwt from 'jsonwebtoken'
import { Response } from 'express'
import bcrypt from 'bcrypt'
import randomBytes from 'randombytes'

import { v4 as uuidv4 } from 'uuid' // Import the uuid library

const tokenStorage: { [key: string]: string } = {} // Create an object to store tokenId-token mappings

const getToken = (tokenId: string) => {
  return tokenStorage[tokenId]
}

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET_KEY || ''
  const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' })
  const tokenId = uuidv4() // Generate a unique tokenId

  // Store the token associated with the tokenId
  tokenStorage[tokenId] = token

  // Set the HTTP-only cookie with the tokenId
  res.cookie('token_id', tokenId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 60 * 60 * 1000, // 1 hour
  })
}

const clearToken = (res: Response) => {
  res.cookie('token_id', '', {
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

export { getToken, generateToken, clearToken, hashPassword, generateVerificationCode }
