import { FC, ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { useRouter } from 'next/router'
import { Card } from '@/components/common/Card'

interface Props {
    icon: ReactNode
    text: string
    onClick?: () => void
    link?: string
}

export const CardButton: FC<Props> = ({ icon, text, onClick, link }) => {
    const router = useRouter()

    const goToLink = () => router.push(link || '')

    return (
        <Card
            style={{ height: '100%' }}
            onClick={onClick || goToLink}
        >
            <Flex vertical justify={'center'} align={'center'} gap={'small'} style={{ height: 'inherit' }}>
                <span style={{ fontSize: 72 }}>{icon}</span>
                <Typography.Title level={4}>{text}</Typography.Title>
            </Flex>
        </Card>
    )
}