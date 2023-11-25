import { ProductDetails, User } from './user.interface'
import { UserModel } from './user.model'

const saveUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData)

  const retrievedUser = await UserModel.findById(result._id).select(
    '-password -orders',
  )
  return retrievedUser
}

const getUsersFromDB = async () => {
  const result = await UserModel.find().select(
    'username fullName age email address',
  )

  return result
}

const getUserByUserId = async (userId: string) => {
  const user = await UserModel.findOne({ userId: userId }).select(
    '-password -orders',
  )

  return user
}

const updateUserData = async (userId: string, updatedData: Partial<User>) => {
  const result = await UserModel.updateOne(
    { userId: userId },
    { $set: updatedData },
  )

  return result
}

const deleteUserFromDB = async (userId: string) => {
    const result = await UserModel.deleteOne({ userId: userId });

    return result;
};

const addOrderToUser = async (userId: string, order: ProductDetails) => {
    const result = await UserModel.updateOne({ userId: userId }, { $push: { orders: order } });

    return result;
};

const getAllOrdersOfAUser = async (userId: string) => {
    const user = await UserModel.findOne({ userId: userId }).select('orders');

    if (user) {
      return user.orders || [];
    } else {
      return [];
    }
};

// Function to calculate total price from orders
const calculateTotalPriceForOrders = (orders: ProductDetails[]) => {
  return orders.reduce((totalPrice, order) => {
    return totalPrice + (order.price || 0) * (order.quantity || 0);
  }, 0);
};


const calculateTotalPriceForUser = async (userId: string) => {
    const user = await UserModel.findOne({ userId: userId }).select('orders');

    if (!user) {
      console.log('User not found');
      return 0; // or throw an error, depending on your requirements
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
