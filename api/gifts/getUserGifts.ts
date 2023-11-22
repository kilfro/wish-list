import { AUTH } from '@/firebase/index'
import { axiosInstance } from '@/api/index'
import { Gift } from '@/types/gift'

export const getUserGifts = async (): Promise<Array<Gift>> => {
    const userId = AUTH.currentUser?.uid

    const response = await axiosInstance.get(`/users/${userId}/gifts`)

    return response.data
}