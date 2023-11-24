import { User } from "./user.interface";
import { UserModel } from "./user.model";

const saveUserIntoDB = async (userData: User) => {
    const result = await UserModel.create(userData)

    return result;
}


export const userServices = {
    saveUserIntoDB,
}