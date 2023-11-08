import { List, ListCreateType, ListId } from '@/types/list'
import {
    addDoc,
    collection,
    deleteDoc,
    deleteField,
    doc,
    getDoc,
    getDocs,
    orderBy,
    OrderByDirection,
    query,
    updateDoc,
    where,
} from '@firebase/firestore'
import { AUTH, DB } from '../index'
import { GIFTS_COLLECTION, LISTS_COLLECTION } from '@/firebase/constants'
import { getListGifts } from '@/firebase/db/gifts'

export const getAllLists = async (): Promise<Array<List>> => {
    const querySnapshot = await getDocs(collection(DB, LISTS_COLLECTION))

    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as List))
}

export const getUserLists = async (sort = 'title', order: OrderByDirection = 'desc'): Promise<Array<List>> => {
    const querySnapshot = await getDocs(
        query(
            collection(DB, LISTS_COLLECTION),
            where('userId', '==', AUTH.currentUser?.uid),
            orderBy(sort, order),
        ),
    )

    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as List))
}

export const getListById = async (listId: ListId | undefined): Promise<List | undefined> => {
    if (!!listId) {
        const documentSnapshot = await getDoc(doc(collection(DB, LISTS_COLLECTION), listId))

        return { ...documentSnapshot.data(), id: documentSnapshot.id } as List
    }
}

export const deleteList = async (listId: ListId | undefined) => {
    if (!!listId) {
        await deleteDoc(doc(DB, LISTS_COLLECTION, listId))

        const gifts = await getListGifts(listId)

        await Promise.all(gifts.map(gift => updateDoc(
                doc(DB, GIFTS_COLLECTION, gift.id),
                {
                    listId: deleteField(),
                },
            ),
        ))
    }
}

export const createList = async (newList: ListCreateType) => {
    await addDoc(collection(DB, LISTS_COLLECTION), newList)
}

export const updateList = async (listId: ListId, updatedList: ListCreateType) => {
    await updateDoc(doc(DB, LISTS_COLLECTION, listId), updatedList)
}