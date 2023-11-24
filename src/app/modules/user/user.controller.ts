import { Request, Response } from "express"

const createUser = (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
    })
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