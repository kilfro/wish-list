import { DecodedIdToken, getAuth } from 'firebase-admin/auth'
import { FetchError } from '../error'

export const verifyToken = async (request): Promise<DecodedIdToken> => {
    const appToken = request.header('X-Firebase-AppCheck')

    if (!appToken) {
        throw new FetchError(401, 'Token was not received')
    }

    return await getAuth().verifyIdToken(appToken)
}