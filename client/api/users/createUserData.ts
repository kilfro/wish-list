import { UserData } from '../../types/user'
import { axiosInstance } from '../index'

export const createUserData = async (userData: UserData) => {
    return await axiosInstance.post('users', userData)
}