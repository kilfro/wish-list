import { Router } from 'express'
import { DB } from '../../firebase'
import { Collection } from '../../constants/collection'
import { verifyToken } from '../../helpers/functions'
import { FetchError } from '../../error'

const giftsRouter = Router()

giftsRouter.get('', async (req, res) => {
    try {
        const collectionSnapshot = await DB.collection(Collection.GIFTS).get()
        const gifts = collectionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        res.json(gifts)
    } catch (err) {
        res.status(500).send(err)
    }
})

giftsRouter.post('', async (req, res) => {
    const giftData = req.body

    try {
        const decodedToken = await verifyToken(req)

        const createdGiftReference = await DB.collection(Collection.GIFTS).add({
            ...giftData,
            userId: decodedToken.uid,
            createdTime: Date.now(),
        })

        const createdGift = await createdGiftReference.get()

        res.status(201).send({ ...createdGift.data(), id: createdGift.id })
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

giftsRouter.get('/:giftId', async (req, res) => {
    const { giftId } = req.params

    try {
        const documentSnapshot = await DB.collection(Collection.GIFTS).doc(giftId).get()

        if (!documentSnapshot.exists) {
            res.status(404).send()
        } else {
            res.json({ ...documentSnapshot.data(), id: documentSnapshot.id })
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

giftsRouter.delete('/:giftId', async (req, res) => {
    const { giftId } = req.params

    try {
        const documentSnapshot = await DB.collection(Collection.GIFTS).doc(giftId).get()

        if (!documentSnapshot.exists) {
            res.status(404).send()
        }

        const decodedToken = await verifyToken(req)

        if (documentSnapshot.data()?.userId !== decodedToken.uid) {
            res.status(403).send()
        }

        await DB.collection(Collection.GIFTS).doc(giftId).delete()

        res.status(200).send()
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

giftsRouter.put('/:giftId/toggleGiver', async (req, res) => {
    const { giftId } = req.params

    try {
        const giftSnapshot = await DB.collection(Collection.GIFTS).doc(giftId).get()

        if (!giftSnapshot.exists) {
            res.status(404).send()
        }
        const currentGiver = giftSnapshot.data()?.giverId
        const decodedToken = await verifyToken(req)

        if (!!currentGiver && (currentGiver !== decodedToken.uid)) {
            res.status(403).send()
        }

        const newGiftData = {
            giverId: !!currentGiver ? null : decodedToken.uid,
        }

        await DB.collection(Collection.GIFTS).doc(giftId).update(newGiftData)

        res.status(204).send()
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

giftsRouter.put('/:giftId', async (req, res) => {
    const { giftId } = req.params
    const giftData = req.body

    try {
        const giftSnapshot = await DB.collection(Collection.GIFTS).doc(giftId).get()

        if (!giftSnapshot.exists) {
            res.status(404).send()
        }

        const decodedToken = await verifyToken(req)

        if (giftSnapshot.data()?.userId !== decodedToken.uid) {
            res.status(403).send()
        }

        await DB.collection(Collection.GIFTS).doc(giftId).update(giftData)

        res.status(204).send()
    } catch (err) {
        if (err instanceof FetchError) {
            res.status(err.status).send(err.message)
        } else {
            res.status(500).send(err)
        }
    }
})

export default giftsRouter