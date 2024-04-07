import express from 'express'
import SubscribeController from '../controllers/SubscribeController'

const router = express.Router()

// Subscribe (Authentication required)
router.post('/subscribe', SubscribeController.subscribe)
router.delete('/unsubscribe', SubscribeController.unsubscribe)

export default router
