import { tokenizedRequest } from '@/api/index'
import { GiftId } from '@/types/gift'

export const toggleGiver = async (giftId: GiftId) => {
    return await tokenizedRequest(
        `/gifts/${giftId}/toggleGiver`, {
            method: 'PUT',
        },
    )
}