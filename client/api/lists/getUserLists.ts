import { tokenizedRequest } from '../index'
import { OrderByDirection } from '@firebase/firestore'
import { List } from '../../types/list'

export const getUserLists = async (userId: string | undefined, sortBy: string = 'title', order?: OrderByDirection): Promise<Array<List>> => {
    if (!userId) {
        return []
    }

    const response = await tokenizedRequest(
        `/users/${userId}/lists`,
        {
            method: 'GET',
            params: {
                sortBy,
                order,
            },
        },
    )

    return response.data
}