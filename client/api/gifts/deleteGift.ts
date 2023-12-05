import { tokenizedRequest } from '../index'
import { GiftId } from '../../types/gift'

export const deleteGift = async (giftId: GiftId | undefined) => {
    if (!giftId) {
        return
    }

    return tokenizedRequest(`/gifts/${giftId}`, {
        method: 'DELETE',
    })
}