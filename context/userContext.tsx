import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from '@firebase/auth'
import { AUTH } from '@/firebase/index'

const UserContext = createContext<User | null>(null)

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        onAuthStateChanged(AUTH, userData => {
            setUser(userData)
        })
    }, [])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)
