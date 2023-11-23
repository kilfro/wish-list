import { Router } from 'express'
import { DB } from '../../firebase'
import { firestore } from 'firebase-admin'
import { Collection } from '../../constants/collection'
import OrderByDirection = firestore.OrderByDirection

const usersRouter = Router()

usersRouter.post('', async (req, res) => {
    try {
        const { id, ...otherData } = req.body
        await DB.collection(Collection.USERS).doc(`/${id}/`).set(otherData)

        res.status(201).send()
    } catch (err) {
        res.status(500).send(err)
    }
})

usersRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params

    try {
        const docSnapshot = await DB.collection(Collection.USERS).doc(`/${userId}/`).get()

        if (docSnapshot.exists) {
            res.json({ id: docSnapshot.id, ...docSnapshot.data() })
        } else {
            res.status(404).send(`User with ID=${userId} wasn't found`)
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

usersRouter.get('/:userId/gifts', async (req, res) => {
    const { userId } = req.params

    try {
        const querySnapshot = await DB.collection(Collection.GIFTS)
            .where('userId', '==', userId)
            .get()

        const userGifts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        res.json(userGifts)
    } catch (err) {
        res.status(500).send(err)
    }
})

usersRouter.get('/:userId/lists', async (req, res) => {
    const { sortBy, order } = req.query
    const { userId } = req.params

    try {
        const querySnapshot = await DB.collection(Collection.LISTS)
            .where('userId', '==', userId)
            .orderBy(sortBy as string, order as OrderByDirection)
            .get()

        const userLists = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        res.json(userLists)
    } catch (err) {
        res.status(500).send(err)
    }
})

export default usersRouter