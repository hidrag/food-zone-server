import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
	const token = req.header('Authorization')?.replace('Bearer ', '')

	if (!token) {
		return res.status(401).json({ message: 'Not authorized, no token' })
	} else {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.user = await User.findById(decoded.userId).select('-password')
			/* console.log(
				'Auth header:',
				req.headers.authorization,
				'Decoded user:',
				req.user
			) */
			next()
		} catch (err) {
			res.status(401).json({ message: 'Not authorized, token failed' })
		}
	}
}

export default protect
