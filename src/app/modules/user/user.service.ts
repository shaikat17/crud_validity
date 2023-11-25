import { User } from './user.interface'
import { UserModel } from './user.model'

const saveUserIntoDB = async (userData: User) => {
  const result = await UserModel.create(userData)

  const retrievedUser = await UserModel.findById(result._id).select('-password -orders');
  return retrievedUser;
}

const getUsersFromDB = async () => {
  const result = await UserModel.find().select('username fullName age email address');

  return result;
};


export const userServices = {
  saveUserIntoDB,
  getUsersFromDB,
}
