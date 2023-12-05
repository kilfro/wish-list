import { GiftBaseData } from '../../types/gift'
import { tokenizedRequest } from '../index'

export const createGift = async (giftData: GiftBaseData) => {
    return await tokenizedRequest('/gifts', {
        method: 'POST',
        data: giftData,
    })
}