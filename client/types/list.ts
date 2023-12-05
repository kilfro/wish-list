import { Dayjs } from 'dayjs'

export type ListId = string

export interface ListBaseData {
    title: string
    date?: number | null
    emoji?: string | null
}

export interface List extends ListBaseData {
    id: ListId
    userId: string
    createdTime: number
}

export interface ListFormType extends Omit<List, 'id' | 'date'> {
    date: Dayjs | null
}
