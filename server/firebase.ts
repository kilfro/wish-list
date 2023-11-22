import admin from 'firebase-admin'

const serviceAccount = require('./admin.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://wish-list-861de.firebaseio.com"',
})

export const DB: admin.firestore.Firestore = admin.firestore()