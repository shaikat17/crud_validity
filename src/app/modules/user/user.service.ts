import { User } from './user.interface'
import { UserModel } from './user.model'

const saveUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData)

  return result
}

const getUsersFromDB = async () => {
    const result = await UserModel.find().select('-password').lean();

    const filteredResult = result.map(user => {
        return user.orders && user.orders.length === 0
        ? { ...user, orders: undefined }
        : user;
    });
  
    return filteredResult;
}

export const userServices = {
  saveUserIntoDB,
  getUsersFromDB
}
