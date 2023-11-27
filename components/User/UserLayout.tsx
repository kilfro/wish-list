import { Layout, Menu, MenuProps } from 'antd'
import { FileTextOutlined, GiftOutlined } from '@ant-design/icons'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '@/components/MainLayout'

interface Props {
    children: ReactNode
    entities?: Array<any>
}

const { Sider } = Layout

export const UserLayout: FC<Props> = ({ children, entities }) => {
    const router = useRouter()
    const [current, setCurrent] = useState('')

    useEffect(() => {
        setCurrent(router.route.split('/')[2])
    }, [])

    const menuItems: MenuProps['items'] = [
        {
            label: 'Мои подарки',
            key: 'gifts',
            icon: <GiftOutlined/>,
            onClick: () => router.push('/user/gifts'),
        },
        {
            label: 'Вишлисты',
            key: 'lists',
            icon: <FileTextOutlined/>,
            onClick: () => router.push('/user/lists'),
        },
    ]


    return (
        <MainLayout>
            <Layout style={{ margin: '30px auto', width: 'fit-content' }}>
                <Sider style={{ backgroundColor: 'inherit' }}>
                    <Menu
                        items={menuItems}
                        selectedKeys={[current]}
                        mode={'vertical'}
                        style={{ backgroundColor: 'inherit', border: 'none' }}
                    />
                </Sider>

                <div
                    style={{
                        maxWidth: 924,
                        margin: '0 12px',
                        minWidth: entities && (entities?.length > 2) ? 'auto' : 924,
                    }}
                >
                    {children}
                </div>
            </Layout>
        </MainLayout>
    )
}