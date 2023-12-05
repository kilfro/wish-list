import { Gift } from '../../types/gift'
import { axiosInstance } from '../index'
import { ListId } from '../../types/list'

export const getInListGifts = async (listId: ListId | undefined): Promise<Array<Gift>> => {
    if (!listId) {
        return []
    }

    const response = await axiosInstance.get(`/lists/${listId}/gifts`)

    return response.data
}