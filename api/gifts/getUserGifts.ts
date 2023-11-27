import { axiosInstance } from '@/api/index'
import { Gift } from '@/types/gift'

export const getUserGifts = async (userId: string | undefined): Promise<Array<Gift>> => {
    if (!userId) {
        return []
    }

    const response = await axiosInstance.get(`/users/${userId}/gifts`)

    return response.data
}