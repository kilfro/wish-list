import { Layout } from 'antd'
import { CSSProperties, ReactNode } from 'react'
import { HeaderMenu } from '@/components/HeaderMenu'

const { Header } = Layout

interface LayoutProps {
    children: ReactNode
}

const headerStyle: CSSProperties = {
    backgroundColor: '#1677ff',
}

export const MainLayout = ({ children }: LayoutProps) => {
    return (
        <Layout style={{ height: '100%', minHeight: '100vh' }}>
            <Header style={headerStyle}>
                <HeaderMenu/>
            </Header>
            <div>
                {children}
            </div>
        </Layout>
    )
}