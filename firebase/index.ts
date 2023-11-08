import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyACrGwvxxISFwF6uZi9klPRE3QdgugCAnE',
    authDomain: 'wish-list-861de.firebaseapp.com',
    projectId: 'wish-list-861de',
    storageBucket: 'wish-list-861de.appspot.com',
    messagingSenderId: '941201022616',
    appId: '1:941201022616:web:92e0d431b10d9e0db0faed',
    measurementId: 'G-5NXJL8VX8H',
}

const app = initializeApp(firebaseConfig)

export const index = getFirestore(app)