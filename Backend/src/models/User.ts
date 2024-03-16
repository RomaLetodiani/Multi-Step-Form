import 'dotenv/config';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { validateEmail } from '../utils/validation';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();

  if (!validateEmail(this.email)) {
    throw new Error('Invalid email format');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
