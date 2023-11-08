import { Dayjs } from 'dayjs'

export type ListId = string

export interface List {
    id: ListId
    userId: string
    title: string
    date?: number | null
    emoji?: string | null
    createdTime: number
}

export interface ListFormType extends Omit<List, 'id' | 'date'> {
    date: Dayjs | null
}

export type ListCreateType = Omit<List, 'id'>

