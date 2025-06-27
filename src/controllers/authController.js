// src/controllers/authController.js
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'
import { validationResult } from 'express-validator'

export const registerUser = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const { name, email, password } = req.body
	const userExists = await User.findOne({ email })

	if (userExists)
		return res.status(400).json({ message: 'User already exists' })

	const user = await User.create({ name, email, password })

	if (user) {
		res.status(201).json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
			},
			token: generateToken(user._id),
		})
	} else {
		res.status(400).json({ message: 'Invalid user data' })
	}
}

export const loginUser = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.status(200).json({
			success: true,
			message: 'Login successful',
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
			},
			token: generateToken(user._id),
		})
	} else {
		res.status(401).json({ success: false, message: 'Invalid credentials' })
	}
}

export const getUserById = async (req, res) => {
	const user = await User.findById(req.params.id).select('-password')
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({ message: 'User not found' })
	}
}
