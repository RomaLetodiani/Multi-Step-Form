import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/auth'

export interface Verification {
  verified: boolean
  verificationCode: string | null
  verificationCodeExpiresAt: Date | null
  lastVerificationRequestAt: Date | null
}

const verificationSchema: Schema = new Schema({
  verified: { type: Boolean, required: true, default: false },
  verificationCode: { type: String, default: null },
  verificationCodeExpiresAt: { type: Date, default: null },
  lastVerificationRequestAt: { type: Date, default: null },
})

export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  verification: Verification
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verification: { type: verificationSchema, default: {} },
  },
  { versionKey: false },
)

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) next()

  try {
    this.password = await hashPassword(this.password)
    next()
  } catch (error) {
    next(new Error('Error hashing password'))
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (error) {
    console.error('Error comparing passwords:', error) // Log for debugging
    return false
  }
}

export const User = mongoose.model<UserDocument>('User', userSchema)
