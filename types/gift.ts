import { ListId } from '@/types/list'

export type GiftId = string

export interface GiftBaseData {
    name: string
    link?: string
    price?: number
    imgUrl: string
    listId?: ListId
    giverId?: string | null
}

export interface Gift extends GiftBaseData {
    id: GiftId
    userId: string
    createdTime: number
}

export type GiftFormType = Omit<Gift, 'id' | 'giverId'>