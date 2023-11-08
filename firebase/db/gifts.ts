import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from '@firebase/firestore'
import { AUTH, DB } from '@/firebase/index'
import { GIFTS_COLLECTION } from '@/firebase/constants'
import { Gift, GiftFormType, GiftId } from '@/types/gift'
import { ListId } from '@/types/list'


export const getGiftsIds = async (): Promise<Array<string>> => {
    const querySnapshot = await getDocs(collection(DB, GIFTS_COLLECTION))

    return querySnapshot.docs.map(doc => doc.id)
}

export const getGiftsByUserId = async () => {
    const querySnapshot = await getDocs(query(collection(DB, GIFTS_COLLECTION), where('userId', '==', AUTH.currentUser?.uid)))

    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Gift))
}

export const getListGifts = async (listId: ListId | undefined) => {
    if (!!listId) {
        const querySnapshot = await getDocs(query(collection(DB, GIFTS_COLLECTION), where('listId', '==', listId)))

        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Gift))
    }

    return []
}

export const getGiftById = async (id: GiftId): Promise<Gift> => {
    const documentSnapshot = await getDoc(doc(collection(DB, GIFTS_COLLECTION), id))

    return { ...documentSnapshot.data(), id: documentSnapshot.id } as Gift
}

export const createGift = async (newGift: GiftFormType) => {
    await addDoc(
        collection(DB, GIFTS_COLLECTION),
        newGift,
    )
}

export const editGift = async (giftId: GiftId, updatedGift: GiftFormType) => {
    await setDoc(
        doc(collection(DB, GIFTS_COLLECTION), giftId),
        updatedGift,
    )
}

export const deleteGift = async (giftId: GiftId) => {
    await deleteDoc(doc(DB, GIFTS_COLLECTION, giftId))
}

export const toggleGiver = async (giftId: GiftId, userId: string | null) => {
    await updateDoc(
        doc(collection(DB, GIFTS_COLLECTION), giftId),
        {
            giverId: userId,
        },
    )
}