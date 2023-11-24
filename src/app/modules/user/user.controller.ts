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

const getUser = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Users fetched successfully!',
  })
}

export const userController = {
  createUser,
  getUser,
}
