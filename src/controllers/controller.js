//const fetch = require('cross-fetch')
import fetch from 'node-fetch'
import 'dotenv/config'

const SWIGGY_RESTAURANT_API = process.env.SWIGGY_RESTAURANT_API

const SWIGGY_MENU_API = process.env.SWIGGY_MENU_API

const initialData = (req, res) => {
	res.json({
		test: 'Welcome to FoodZone! - See Live Web URL for this Server - https://food-zone-aroy.vercel.app/',
	})
}

const restaurantsData = async (req, res) => {
	const { lat, lng, page_type } = req.query
	console.log('Received lat/lng:', lat, lng)

	const url = `${SWIGGY_RESTAURANT_API}?lat=${lat}&lng=${lng}&page_type=${page_type}`

	console.log(url)

	/* await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Internal Server Error')
			}

			return response.json()
		})
		.then((data) => {
			res.json(data)
		})
		.catch((error) => {
			console.log('There was an ' + error)
			res.status(500).send(error)
		}) */

	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
			},
		})
		if (!response.ok) throw new Error('Internal Server Error')
		const data = await response.json()
		res.json(data)
		console.log('Restaurant data fetched successfully')
		//console.log('Data:', data)
	} catch (error) {
		console.error('Error fetching restaurant data:', error.message)
		res.status(500).send('Error fetching data')
	}
}

const menuData = async (req, res) => {
	const {
		'page-type': page_type,
		'complete-menu': complete_menu,
		lat,
		lng,
		submitAction,
		restaurantId,
	} = req.query

	const url = `${SWIGGY_MENU_API}?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`
	console.log(url)

	await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error('Internal Server Error')
			}
			return response.json()
		})
		.then((data) => {
			res.json(data)
		})
		.catch((error) => {
			console.log('There was an ' + error)
			res.status(500).send(error)
		})
}

export default { initialData, restaurantsData, menuData }
