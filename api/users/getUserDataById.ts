import { axiosInstance } from '@/api/index'
import { UserData } from '@/types/user'

export const getUserDataById = async (userId: string | undefined) => {
    if (!userId) {
        return
    }

    return await axiosInstance.get<UserData>(`/users/${userId}`)
}