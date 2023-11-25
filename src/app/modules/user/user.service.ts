import { User } from './user.interface'
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


export const userServices = {
  saveUserIntoDB,
  getUsersFromDB,
  getUserByUserId,
  updateUserData,
  deleteUserFromDB
}
