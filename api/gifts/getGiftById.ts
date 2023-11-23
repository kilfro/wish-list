import { Gift, GiftId } from '@/types/gift'
import { axiosInstance } from '@/api/index'

export const getGiftById = async (giftId: GiftId | undefined): Promise<Gift | undefined> => {
    if (!giftId) {
        return undefined
    }

    const response = await axiosInstance.get(`/gifts/${giftId}`)

    return response.data
}