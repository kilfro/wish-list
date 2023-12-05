import { GiftBaseData, GiftId } from '../../types/gift'
import { tokenizedRequest } from '../index'

export const updateGift = async (giftId: GiftId, giftData: Partial<GiftBaseData>) => {
    return await tokenizedRequest(`/gifts/${giftId}`, {
        method: 'PUT',
        data: giftData,
    })
}