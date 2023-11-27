import { ProductDetails, User } from './user.interface'
import { UserModel } from './user.model'

// For creating a new user
const saveUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData)

  const retrievedUser = await UserModel.findById(result._id).select(
    '-password -orders',
  )
  return retrievedUser
}

// To retrieve all users from DB
const getUsersFromDB = async () => {
  const result = await UserModel.find().select(
    'username fullName age email address',
  )

  return result
}

// To get an user using userId
const getUserByUserId = async (userId: string) => {
  const user = await UserModel.findOne({ userId: userId }).select(
    '-password -orders',
  )

  return user
}

// For updating an user information using userId
const updateUserData = async (userId: string, updatedData: Partial<User>) => {
  const result = await UserModel.updateOne(
    { userId: userId },
    { $set: updatedData },
  )

  const user = await UserModel.findOne({userId}).select(
    '-password -orders',
  )

  return user
}

// Delete an user by using userId
const deleteUserFromDB = async (userId: string) => {
    const result = await UserModel.deleteOne({ userId: userId });

    return result;
};


// Add order for an existing user
const addOrderToUser = async (userId: string, order: ProductDetails) => {
    const result = await UserModel.updateOne({ userId: userId }, { $push: { orders: order } });

    return result;
};

// To get all order of an user
const getAllOrdersOfAUser = async (userId: string) => {
    const user = await UserModel.findOne({ userId: userId }).select('orders');

    return user;
};

// To calculate total price of an users orders
const calculateTotalPriceForOrders = (orders: ProductDetails[]) => {
  return orders.reduce((totalPrice, order) => {
    return totalPrice + (order.price || 0) * (order.quantity || 0);
  }, 0);
};

// To get the total price of an user
const calculateTotalPriceForUser = async (userId: string) => {
    const user = await UserModel.findOne({ userId: userId }).select('orders');

    if (!user) {
      console.log('User not found');
      return 0; 
    }

    const orders = user.orders || [];
    const totalPrice = calculateTotalPriceForOrders(orders).toFixed(2)

    return {totalPrice};
};



export const userServices = {
  saveUserIntoDB,
  getUsersFromDB,
  getUserByUserId,
  updateUserData,
  deleteUserFromDB,
  addOrderToUser,
  getAllOrdersOfAUser,
  calculateTotalPriceForUser
}
