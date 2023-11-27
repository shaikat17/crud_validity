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
    if(result){
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,})
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const userData = req.body

  try {
    const result = await userServices.updateUserData(userId, userData)
    console.log("🚀 ~ file: user.controller.ts:65 ~ updateUser ~ result:", result)
    if(result) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      })
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    
  } catch (error) {
    console.log(error)
  }
}

const deleteAnUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const result = await userServices.deleteUserFromDB(userId)
    if(result.deletedCount){
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    })} else {
return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
      }
  } catch (error) {
    console.log(error)
  }
}

const addOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const order = req.body

  try {
    const result = await userServices.addOrderToUser(userId, order)
    if(result.modifiedCount){
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    })} else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const getOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const result = await userServices.getAllOrdersOfAUser(userId)
    if(result){
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    })} else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const getOrdersPrice = async (req: Request, res: Response) => {
  const userId = req.params.userId

  try {
    const result = await userServices.calculateTotalPriceForUser(userId)
    if(result) {
    return res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    })} else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error)
  }
}


export const userController = {
  createUser,
  getUser,
  getAnUser,
  updateUser,
  deleteAnUser,
  addOrder,
  getOrders,
  getOrdersPrice
}
