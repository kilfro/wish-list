import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AUTH } from '@/firebase/index'
import { createUserData, getUserById } from '@/firebase/db/users'

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account',
})

export const signInGoogle = async () => {
    try {
        const authData = await signInWithPopup(AUTH, provider)

        const userData = await getUserById(authData.user.uid)

        if (!userData) {
            await createUserData({
                id: authData.user.uid,
                name: authData.user.displayName || '',
                pictureUrl: authData.user.photoURL || '',
            })
        }

        history.back()
    } catch (error) {
        location.replace('/login/error')
    }
}
