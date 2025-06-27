// src/routes/authRoutes.js
import express from 'express'
import {
	loginUser,
	registerUser,
	getUserById,
} from '../controllers/authController.js'
import { body } from 'express-validator'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post(
	'/register',
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('email').notEmpty().withMessage('Email is required'),
		body('email').isEmail().withMessage('Valid email is required'),
		body('password').notEmpty().withMessage('Password is required'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
	],
	registerUser
)

router.post(
	'/login',
	[
		body('email').notEmpty().withMessage('Email is required'),
		body('email').isEmail().withMessage('Valid email is required'),
		body('password').notEmpty().withMessage('Password is required'),
	],
	loginUser
)

router.get('/:id', protect, getUserById)

export default router
