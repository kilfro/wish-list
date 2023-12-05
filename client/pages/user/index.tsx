import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserContext } from '../../context/userContext'

export default function User() {
    const router = useRouter()
    const user = useUserContext()

    useEffect(() => {
        if (user) {
            router.push('/user/gifts')
        } else {
            router.push('/')
        }
    })
}