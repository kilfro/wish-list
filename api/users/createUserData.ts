import { UserData } from '@/types/user'
import { axiosInstance } from '@/api/index'

export const createUserData = async (userData: UserData) => {
    return await axiosInstance.post('users', userData)
}