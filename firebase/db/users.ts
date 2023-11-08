import { UserData } from '@/types/user'
import { collection, doc, getDoc, setDoc } from '@firebase/firestore'
import { DB } from '@/firebase/index'
import { USERS_COLLECTION } from '@/firebase/constants'

export const getUserById = async (userId: string | undefined) => {
    if (!!userId) {
        const docSnapshot = await getDoc(doc(collection(DB, USERS_COLLECTION), userId))

        if (docSnapshot.exists()) {
            return { ...docSnapshot.data(), id: docSnapshot.id } as UserData
        }
    }
}

export const createUserData = async (userData: UserData) => {
    const { id, ...otherData } = userData

    await setDoc(doc(DB, USERS_COLLECTION, id), otherData)
}