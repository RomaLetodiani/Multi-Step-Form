import { Request, Response } from 'express'
import { Subscription } from '../models/Subscription'
import { SubscriptionError } from '../middlewares/errorMiddleware'

const addOnsMap: {
  [key: number]: { name: string; price: number; description: string }
} = {
  1: { name: 'Online Service', price: 1, description: 'Access to multiplayer games' },
  2: { name: 'Larger Storage', price: 2, description: 'Extra 1TB of cloud save' },
  3: { name: 'Customizable Profile', price: 2, description: 'Custom theme on your Profile' },
}

class SubscribeServices {
  async subscribe(req: Request, res: Response) {
    const user = res.user

    if (user?.subscription) {
      throw new SubscriptionError('User already subscribed')
    }

    const { name, type, addOnsIds } = req.body

    if (user) {
      const now = new Date()
      const price = name === 'arcade' ? 90 : name === 'advanced' ? 120 : 150
      const addOns = addOnsIds.map((id: number) => {
        return addOnsMap[id]
      })
      const newSubscription = {
        user: user._id,
        name,
        monthlyPrice: type ? price : price / 10,
        addOns,
        active: true,
        type,
        expiresAt: type
          ? new Date(now.setFullYear(now.getFullYear() + 1)).toISOString()
          : new Date(now.setDate(now.getDate() + 30)).toISOString(),
      }
      const subscription = await Subscription.create(newSubscription)
      return subscription
    }
  }

  async unsubscribe(res: Response) {
    const user = res.user

    if (!user?.subscription) {
      throw new SubscriptionError('User already unsubscribed')
    }

    await Subscription.findOneAndDelete({ _id: user.subscription })
  }
}

export default SubscribeServices
