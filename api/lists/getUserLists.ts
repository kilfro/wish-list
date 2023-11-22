import { tokenizedRequest } from '@/api/index'
import { OrderByDirection } from '@firebase/firestore'
import { List } from '@/types/list'
import { AUTH } from '@/firebase/index'

export const getUserLists = async (sortBy: string = 'title', order?: OrderByDirection): Promise<Array<List>> => {
    const userId = AUTH.currentUser?.uid

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