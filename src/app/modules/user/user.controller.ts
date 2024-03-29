import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { userServices } from './user.service'
import { ProductDetailsJoiSchema, UserJoiSchema } from './user.validation'

// Controler for creating an user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const {error} = UserJoiSchema.validate(user)

    if(error){
      return res.status(200).json({
        success: false,
        message: 'Opps! Something went wrong.',
        data: error.details[0].message,
      })
    }
    
    // to hash the user password
    bcrypt.hash(user.password, 10, async function(err, hash) {
      user.password = hash
      const result = await userServices.saveUserIntoDB(user)

    return res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  });

  } catch (error) {
    console.log(error)
  }
}

// Controller for getting all user from DB
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

// Controller to get a specific user
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

// Controller to update a user
const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const userData = req.body

  try {
    const result = await userServices.updateUserData(userId, userData)
    
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

// Controller to delete an user by using userId
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

// Controller to add order details for an user
const addOrder = async (req: Request, res: Response) => {
  const userId = req.params.userId
  const order = req.body

  try {
    const {error} = ProductDetailsJoiSchema.validate(order)

    if(error){
      return res.status(200).json({
        success: false,
        message: 'Opps! Something went wrong.',
        data: error.details[0].message,
      })
    }

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

// Controller to retrieve all orders of an user
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

// Controller to get total price of all orders of an user
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
