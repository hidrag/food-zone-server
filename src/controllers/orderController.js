import Order from '../models/Order.js'
import { validationResult } from 'express-validator'

// POST /api/orders
const placeOrder = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const userId = req.body.user
		const { items, totalAmount, location } = req.body

		if (!items || items.length === 0) {
			return res.status(400).json({ message: 'Cart is empty' })
		}

		const order = new Order({
			user: userId,
			items,
			totalAmount,
			location,
		})

		const savedOrder = await order.save()
		res.status(201).json(savedOrder)
	} catch (error) {
		console.error('Order creation failed:', error)
		res.status(500).json({ message: 'Failed to place order' })
	}
}

// GET /api/orders/my-orders
const getUserOrders = async (req, res) => {
	try {
		const userId = req.user.id // ✅ comes from auth middleware
		const orders = await Order.find({ user: userId }).sort({
			createdAt: -1,
		})
		res.json(orders)
	} catch (error) {
		console.error('Fetching user orders failed:', error)
		res.status(500).json({ message: 'Failed to fetch order history' })
	}
}

export { placeOrder, getUserOrders }
