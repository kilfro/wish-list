import type { AppProps } from 'next/app'
import { ConfigProvider } from 'antd'
import ru from 'antd/locale/ru_RU'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider locale={ru}>
            <Component {...pageProps} />
        </ConfigProvider>
    )
}