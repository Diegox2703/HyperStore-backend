import { Router } from 'express'
import { createOrder, getOrders } from '../controllers/order.controller.js'
import { isAuth } from '../middlewares/isAuth.js'

const router = Router()

router.get('/orders', isAuth, getOrders)
router.post('/orders', isAuth, createOrder)

export default router