import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/users', userController.createUser)

router.get('/users', userController.getUser)

router.get('/users/:userId', userController.getAnUser)

router.put('/users/:userId', userController.updateUser)

router.delete('/users/:userId', userController.deleteAnUser)

router.post('/users/:userId/orders', userController.addOrder)

router.get('/users/:userId/orders', userController.getOrders)

router.get('/users/:userId/orders/total-price', userController.getOrdersPrice)

export const userRoutes = router
