import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { AUTH } from '@/firebase/index'
import { getUserDataById } from '@/api/users/getUserDataById'
import { createUserData } from '@/api/users/createUserData'
import { AxiosError } from 'axios'

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account',
})

export const signInGoogle = async () => {
    try {
        const authData = await signInWithPopup(AUTH, provider)

        try {
            await getUserDataById(authData.user.uid)
        } catch (err) {
            const error = err as AxiosError

            if (error.response?.status === 404) {
                await createUserData({
                    id: authData.user.uid,
                    name: authData.user.displayName || '',
                    pictureUrl: authData.user.photoURL || '',
                })
            } else {
                throw err
            }
        }

        history.back()
    } catch (error) {
        location.replace('/login/error')
    }
}
