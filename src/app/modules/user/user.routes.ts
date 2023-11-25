import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/users', userController.createUser)

router.get('/users', userController.getUser)

router.get('/users/:userId', userController.getAnUser)

router.put('/users/:userId', userController.updateUser)

export const userRoutes = router
