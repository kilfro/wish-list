import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import ru from 'antd/locale/ru_RU'
import '@/styles/global.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Head from 'next/head'
import { UserContextProvider } from '../context/userContext'

const queryClient = new QueryClient()
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>WishList</title>
            </Head>

            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <ConfigProvider locale={ru}>
                        <Component {...pageProps} />
                    </ConfigProvider>
                </UserContextProvider>
            </QueryClientProvider>
        </>
    )
}