import { axiosInstance } from '@/api/index'
import { UserData } from '@/types/user'

export const getUserDataById = async (userId: string | undefined): Promise<UserData | undefined> => {
    if (!userId) {
        return undefined
    }

    const axiosResponse = await axiosInstance.get<UserData>(`/users/${userId}`)

    return axiosResponse.data
}