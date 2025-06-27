import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { placeOrder, getUserOrders } from '../controllers/orderController.js'
import { body } from 'express-validator'

const router = express.Router()

router.post(
	'/',
	protect,
	[
		body('items')
			.isArray({ min: 1 })
			.withMessage('At least one item is required'),
		body('totalAmount')
			.isNumeric()
			.withMessage('Total amount must be a number'),
	],
	placeOrder
)

router.get('/my-orders', protect, getUserOrders)

export default router
