import { MainLayout } from '@/components/MainLayout'
import { Avatar, Col, Empty, Flex, Row, Space, Typography } from 'antd'
import { getListById } from '@/firebase/db/lists'
import { List } from '@/types/list'
import { Gift } from '@/types/gift'
import { FC, useEffect } from 'react'
import { getListGifts } from '@/firebase/db/gifts'
import { UserData } from '@/types/user'
import { getUserById } from '@/firebase/db/users'
import Head from 'next/head'
import { BaseGiftCard } from '@/components/Gifts/GiftCard/BaseGiftCard'
import { useRouter } from 'next/router'
import { GiverButton } from '@/components/Gifts/GiverButton'
import { useQuery } from 'react-query'
import { useUserContext } from '@/context/userContext'

interface Props {
    list: List
    gifts: Array<Gift>
    userData: UserData
}

const SharedListPage: FC<Props> = () => {
    const router = useRouter()
    const { data: list } = useQuery('list-data', () => getListById(router.query.listId?.toString()))
    const { data: gifts = [] } = useQuery('gifts', () => getListGifts(router.query.listId?.toString()))
    const { data: userData } = useQuery('user', () => getUserById(list?.userId))
    const user = useUserContext()

    useEffect(() => {
        if (list && (list.userId === user?.uid)) {
            router.push({
                pathname: '/user/lists/[listId]',
                query: { listId: list.id },
            })
        }
    }, [list])

    return (
        <MainLayout>
            <Head>
                <title>WishList - {`${list?.emoji} ${list?.title}`}</title>
            </Head>
            <Space
                style={{ width: '100%', backgroundColor: 'white', borderRadius: 24, padding: 24 }}
                direction={'vertical'}
            >
                <Row justify={'space-between'}>
                    <Col>
                        <Typography.Text
                            style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                            }}
                        >
                            {`${list?.emoji} ${list?.title}`}
                        </Typography.Text>
                    </Col>
                    <Col>
                        <Flex align={'center'} gap={'middle'}>
                            <Avatar src={<img src={userData?.pictureUrl}/>} size={'large'}/>
                            <Typography.Text strong style={{ fontSize: 18 }}>{userData?.name}</Typography.Text>
                        </Flex>
                    </Col>
                </Row>

                <Flex gap={'middle'}>
                    <Typography.Text type={'secondary'}>{list?.date}</Typography.Text>
                    <Typography.Text type={'secondary'}>Подарков: {gifts.length}</Typography.Text>
                </Flex>

                <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                    {gifts.length === 0 && <Empty
                        style={{ width: '100%', margin: '20px 0' }}
                        description={'Не добавленно ни одного подарка'}
                    />}

                    {gifts.map(gift => (
                        <Col key={gift.id}>
                            <BaseGiftCard {...gift} footer={<GiverButton giftId={gift.id} giverId={gift.giverId}/>}/>
                        </Col>
                    ))}
                </Row>
            </Space>
        </MainLayout>
    )
}

export default SharedListPage