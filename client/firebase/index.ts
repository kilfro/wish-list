import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'

const envConfig = process.env.NEXT_PUBLIC_FIREBASE_APP_CONFIG || '{}'
const firebaseConfig = JSON.parse(envConfig)

const APP = initializeApp(firebaseConfig)

export const AUTH = getAuth(APP)
