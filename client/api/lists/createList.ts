import { tokenizedRequest } from '../index'
import { ListBaseData } from '../../types/list'

export const createList = async (listData: ListBaseData) => {
    return await tokenizedRequest('/lists/', {
        method: 'POST',
        data: {
            ...listData,
            createdTime: Date.now(),
        },
    })
}