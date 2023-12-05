import { FC, ReactNode } from 'react'
import { MainLayout } from '../MainLayout'
import Head from 'next/head'
import { Layout } from 'antd'

interface SharedListLayoutProps {
    children: ReactNode
    title: string
}

export const SharedListLayout: FC<SharedListLayoutProps> = ({ children, title }) => {
    return (
        <MainLayout>
            <Head>
                <title>{title}</title>
            </Head>

            <Layout style={{ margin: '30px auto', maxWidth: 1296 }}>
                {children}
            </Layout>
        </MainLayout>
    )
}