import { axiosInstance } from '@/api/index'
import { Gift } from '@/types/gift'

export const getAllGiftsIds = async (): Promise<Array<string>> => {
    const response = await axiosInstance.get<Array<Gift>>('/gifts')

    return response.data.map(gift => gift.id)
}