import express from 'express'
import SubscribeController from '../controllers/SubscribeController'

const router = express.Router()

// Subscribe (Authentication required)
router.post('', SubscribeController.subscribe)
router.delete('', SubscribeController.unsubscribe)

export default router
