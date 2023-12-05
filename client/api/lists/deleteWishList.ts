import { ListId } from '../../types/list'
import { tokenizedRequest } from '../index'

export const deleteWishList = async (listId: ListId | undefined) => {
    if (!listId) {
        return
    }

    await tokenizedRequest(`/lists/${listId}`, {
        method: 'DELETE',
    })
}