import { MainLayout } from '@/components/MainLayout'
import Link from 'next/link'
import { Space } from 'antd'

export default function Home() {
    return (
        <MainLayout>
            <Space direction={'vertical'}>
                <Link href={'/user/lists'}>Lists</Link>
                <Link href={'/user/gifts'}>Gifts</Link>
            </Space>
        </MainLayout>
    )
}