import { Request, Response } from 'express'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const result = await userServices.saveUserIntoDB(user)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAnUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const result = await userServices.getUserByUserId(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const userData = req.body
  console.log('User ID: ', userId, 'User Data: ', userData)

  try {
    const result = await userServices.updateUserData(userId, userData)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const userController = {
  createUser,
  getUser,
  getAnUser,
  updateUser,
}
