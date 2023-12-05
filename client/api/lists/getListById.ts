import { axiosInstance } from '../index'
import { List, ListId } from '../../types/list'

export const getListById = async (listId: ListId | undefined) => {
    if (!listId) {
        return
    }

    const response = await axiosInstance.get<List>(`/lists/${listId}`)

    return response.data
}