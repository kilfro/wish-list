import { tokenizedRequest } from '../index'
import { ListBaseData, ListId } from '../../types/list'

export const updateList = async (listId: ListId, listData: ListBaseData) => {
    return await tokenizedRequest(`/lists/${listId}`, {
        method: 'PUT',
        data: listData,
    })
}