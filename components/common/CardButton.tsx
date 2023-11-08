import { FC, ReactNode } from 'react'
import { Card, Flex, Typography } from 'antd'
import { useRouter } from 'next/router'

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
            style={{ width: 300, height: 400, borderRadius: 24 }}
            hoverable
            onClick={onClick || goToLink}
        >
            <Flex vertical justify={'space-around'} align={'center'}>
                <span style={{ fontSize: 72 }}>{icon}</span>
                <Typography.Title level={4}>{text}</Typography.Title>
            </Flex>
        </Card>
    )
}