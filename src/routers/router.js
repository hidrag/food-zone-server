import express from 'express'

const router = express.Router()

//const controller = require('../controllers/controller')
import controller from '../controllers/controller.js'

router.route('/').get(controller.initialData)

router.route('/api/restaurants').get(controller.restaurantsData)

router.route('/api/menu').get(controller.menuData)

//module.exports = router;

export default router
