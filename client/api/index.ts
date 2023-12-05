import { AUTH } from '@/firebase/index'
import axios, { AxiosRequestConfig } from 'axios'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const axiosInstance = axios.create({
    baseURL: `${serverUrl}/api/v1/`,
})

export const tokenizedRequest = async (url: string, config: Omit<AxiosRequestConfig, 'url'>) => {
    const headers: any = { ...config.headers }
    const token = await AUTH.currentUser?.getIdToken()

    if (token) {
        headers['X-Firebase-AppCheck'] = token
    }

    return axiosInstance(url, { ...config, headers })
}

