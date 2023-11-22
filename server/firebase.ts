import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app'

admin.initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://wish-list-861de.firebaseio.com"',
})

export const DB: admin.firestore.Firestore = admin.firestore()