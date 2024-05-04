import mongoose, { Schema, Document } from 'mongoose'
import { User } from './User'

interface AddOn {
  name: string
  price: number
  description: string
}

export interface SubscriptionDocument extends Document {
  name: 'arcade' | 'advanced' | 'pro' // Assuming you have an enum for valid plan types
  type: 0 | 1 // Monthly or Yearly plan type
  monthlyPrice: number
  addOns: AddOn[] // Assuming an AddOn objects with details
  active: boolean
  user: string
  expiresAt: string
}

const addOnSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Online Service', 'Larger Storage', 'Customizable Profile'],
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
})

const subscriptionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, enum: ['arcade', 'advanced', 'pro'] }, // Using enum for validation
    type: { type: Number, required: true, enum: [0, 1] },
    monthlyPrice: { type: Number, required: true },
    addOns: [addOnSchema], // Array of addOn objects
    active: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: String, required: true, default: null },
  },
  { versionKey: false, timestamps: true },
)

subscriptionSchema.post<SubscriptionDocument>('save', async function (doc) {
  const user = await User.findOne({ _id: doc.user })
  if (user) {
    user.subscription = doc._id
    await user.save()
  }
})

subscriptionSchema.post<SubscriptionDocument>(
  'findOneAndDelete',
  async function (doc: SubscriptionDocument) {
    const user = await User.findOne({ _id: doc.user })
    if (user) {
      user.subscription = null
      await user.save()
    }
  },
)
export const Subscription = mongoose.model<SubscriptionDocument>('Subscription', subscriptionSchema)
