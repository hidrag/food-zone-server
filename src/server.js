import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
//require('dotenv').config()
import connectDB from './utils/db.js'
import authRoutes from './routers/authRoutes.js'
import router from './routers/router.js'
import orderRoutes from './routers/orderRoutes.js'

dotenv.config()
connectDB()

const app = express()

const PORT = process.env.PORT || 5050

app.use(
	cors({
		//origin: '*', // frontend origin
		origin: 'https://food-zone-pzritkw4m-abhishek-roys-projects-1d872f17.vercel.app/', // frontend origin
		/* origin: 'http://localhost:5173', */ // frontend origin
		credentials: true, // allow cookies (if used)
	})
)

//const router = require('./routers/router')

app.use('/', router)

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', authRoutes)

app.listen(PORT, () => {
	console.log(`Server is listening on Port ${PORT}`)
})
