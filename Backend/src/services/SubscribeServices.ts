import { Request, Response } from 'express'
import { Subscription } from '../models/Subscription'
import { SubscriptionError } from '../middlewares/errorMiddleware'

class SubscribeServices {
  async subscribe(req: Request, res: Response) {
    const user = res.user

    if (user?.subscription) {
      throw new SubscriptionError('User already subscribed')
    }

    const { name, monthlyPrice, addOns, type } = req.body

    if (user) {
      const now = new Date()
      const newSubscription = {
        user: user._id,
        name,
        monthlyPrice,
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
