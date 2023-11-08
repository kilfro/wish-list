import { ListId } from '@/types/list'

export type GiftId = string

export interface Gift {
    id: GiftId
    userId: string
    name: string
    link?: string
    price?: number
    imgUrl: string
    listId?: ListId
    createdTime: number
    giverId?: string
}

export type GiftFormType = Omit<Gift, 'id' | 'giverId'>