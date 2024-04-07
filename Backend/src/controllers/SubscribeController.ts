import asyncHandler from 'express-async-handler'
import SubscribeServices from '../services/SubscribeServices'
import { Request, Response } from 'express'

class SubscribeController {
  private readonly subscribeServices: SubscribeServices

  constructor() {
    this.subscribeServices = new SubscribeServices()
  }
  // Method for getting user details
  subscribe = asyncHandler(async (req: Request, res: Response) => {
    const subscription = await this.subscribeServices.subscribe(req, res)
    res.status(200).json({ message: 'User subscribed', subscription })
  })

  unsubscribe = asyncHandler(async (req: Request, res: Response) => {
    await this.subscribeServices.unsubscribe(res)
    res.status(200).json({ message: 'User unsubscribed' })
  })
}

export default new SubscribeController()
