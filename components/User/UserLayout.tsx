import { Layout, Menu, MenuProps } from 'antd'
import { CalendarOutlined, FileTextOutlined, GiftOutlined } from '@ant-design/icons'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MainLayout } from '@/components/MainLayout'

interface Props {
    children: ReactNode
}

const { Sider, Content } = Layout

export const UserLayout: FC<Props> = ({ children }) => {
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
        {
            label: 'Календарь',
            key: 'calendar',
            icon: <CalendarOutlined/>,
            onClick: () => router.push('/user/calendar'),
        },
    ]


    return (
        <MainLayout>
            <Layout>
                <Sider style={{ backgroundColor: 'inherit' }}>
                    <Menu
                        items={menuItems}
                        selectedKeys={[current]}
                        mode={'vertical'}
                        style={{ backgroundColor: 'inherit', border: 'none', marginRight: 24 }}
                    />
                </Sider>
                <Content>
                    {children}
                </Content>
            </Layout>
        </MainLayout>
    )
}