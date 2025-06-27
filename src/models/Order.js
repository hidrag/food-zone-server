import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		items: [
			{
				id: String,
				name: String,
				price: Number,
				quantity: Number,
				imageId: String,
			},
		],
		totalAmount: {
			type: Number,
			required: true,
		},
		location: {
			type: String,
			default: 'Unknown',
		},
	},
	{ timestamps: true }
)

const Order = mongoose.model('Order', orderSchema, 'orders')

export default Order
