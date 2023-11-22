import { Router } from 'express'
import { DB } from '../../firebase'
import { firestore } from 'firebase-admin'
import { Collection } from '../../constants/collection'
import { FetchError } from '../../error'
import { verifyToken } from '../../helpers/functions'
import OrderByDirection = firestore.OrderByDirection

const listsRouter = Router()

listsRouter.get('', async (req, res) => {
    const { sortBy, order } = req.query

    try {
        const decodedToken = await verifyToken(req)

        const querySnapshot = await DB.collection(Collection.LISTS)
            .where('userId', '==', decodedToken.uid)
            .orderBy(sortBy as string, order as OrderByDirection)
            .get()

        const lists = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        res.json(lists)
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

listsRouter.post('', async (req, res) => {
    const listData = req.body

    try {
        const decodedToken = await verifyToken(req)

        const createdReference = await DB.collection(Collection.LISTS).add({ ...listData, userId: decodedToken.uid })
        const createdList = await createdReference.get()

        res.status(201).send({ ...createdList.data(), id: createdList.id })
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

listsRouter.put('/:listId', async (req, res) => {
    const { listId } = req.params
    const listData = req.body

    try {
        const listSnapshot = await DB.collection(Collection.LISTS).doc(`/${listId}/`).get()

        if (!listSnapshot.exists) {
            res.status(404).send(`List with ID=${listId} was not found`)
        }

        const decodedToken = await verifyToken(req)

        if (listSnapshot.data()?.userId !== decodedToken.uid) {
            res.status(403).send()
        }

        await DB.collection(Collection.LISTS).doc(listId).update(listData)
        res.status(204).send()
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

listsRouter.delete('/:listId', async (req, res) => {
    const { listId } = req.params

    try {
        const listSnapshot = await DB.collection(Collection.LISTS).doc(`/${listId}/`).get()

        if (!listSnapshot.exists) {
            res.status(404).send(`List with ID=${listId} was not found`)
        }

        const userId = listSnapshot.data()?.userId
        const decodedToken = await verifyToken(req)

        if (userId !== decodedToken.uid) {
            res.status(403).send(`Access to the list with ID=${listId} is denied to the current user`)
        }

        const giftsSnapshot = await DB.collection(Collection.GIFTS).where('listId', '==', listId).get()
        const giftsIds = giftsSnapshot.docs.map(gift => gift.id)

        await Promise.all(giftsIds.map(id =>
            DB.collection(Collection.GIFTS).doc(`/${id}/`).update({
                listId: null,
            }),
        ))

        await DB.collection(Collection.LISTS).doc(`/${listId}/`).delete()

        res.status(200).send()
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }

})

listsRouter.get('/:listId', async (req, res) => {
    const { listId } = req.params

    try {
        const docSnapshot = await DB.collection(Collection.LISTS).doc(listId).get()

        if (!docSnapshot.exists) {
            res.status(404).send(`List with ID=${listId} was not found`)
        }

        res.json({ ...docSnapshot.data(), id: docSnapshot.id })
    } catch (err) {
        res.status(500).send(err)
    }
})

listsRouter.get('/:listId/gifts', async (req, res) => {
    const { listId } = req.params

    try {
        const querySnapshot = await DB.collection(Collection.GIFTS)
            .where('listId', '==', listId)
            .get()

        const gifts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        res.json(gifts)
    } catch (err) {
        res.status(500).send(err)
    }
})

export default listsRouter