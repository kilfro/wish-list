import { Avatar, Col, Empty, Flex, Row, Space, Typography } from 'antd'
import { List } from '../../types/list'
import { Gift } from '../../types/gift'
import { FC, useEffect, useState } from 'react'
import { UserData } from '../../types/user'
import { BaseGiftCard } from '../../components/Gifts/GiftCard/BaseGiftCard'
import { useRouter } from 'next/router'
import { GiverButton } from '../../components/Gifts/GiverButton'
import { useQuery } from 'react-query'
import { useUserContext } from '../../context/userContext'
import { getListById } from '../../api/lists/getListById'
import { getInListGifts } from '../../api/gifts/getInListGifts'
import { SharedListLayout } from '../../components/Lists/SharedListLayout'
import { GetServerSideProps } from 'next'
import { getUserDataById } from '../../api/users/getUserDataById'
import { dateFormatter } from '../../utils/format'
import { GiftModal } from '../../components/Gifts/GiftModal'

interface SharedListPageProps {
    list: List | undefined
    inListGifts: Array<Gift>
    userData: UserData | undefined
}

const SharedListPage: FC<SharedListPageProps> = ({ list, inListGifts, userData }) => {
    const [selectedGiftIndex, setSelectedGiftIndex] = useState<number | null>(null)

    const router = useRouter()
    const user = useUserContext()

    const { data: gifts = [] } = useQuery(['gifts', list?.id], () => getInListGifts(list?.id), {
        enabled: !!list,
        initialData: inListGifts,
    })

    useEffect(() => {
        if (list && (list.userId === user?.uid)) {
            router.push({
                pathname: '/user/lists/[listId]',
                query: { listId: list.id },
            })
        }
    }, [list])

    return (
        <SharedListLayout title={`WishList - ${list?.emoji} ${list?.title}`}>
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
                        <Flex align={'center'} gap={16}>
                            <Avatar src={<img src={userData?.pictureUrl} alt={'Avatar'}/>} size={'large'}/>
                            <Typography.Text strong style={{ fontSize: 18 }}>{userData?.name}</Typography.Text>
                        </Flex>
                    </Col>
                </Row>

                <Flex gap={16}>
                    {list?.date &&
                        <Typography.Text type={'secondary'}>{dateFormatter(list.date)}</Typography.Text>
                    }
                    <Typography.Text type={'secondary'}>Подарков: {gifts.length}</Typography.Text>
                </Flex>

                <Flex gap={16} justify={'start'} style={{ marginTop: 12 }} wrap={'wrap'}>
                    {gifts.length === 0 && <Empty
                        style={{ width: '100%', margin: '20px 0' }}
                        description={'Не добавленно ни одного подарка'}
                    />}

                    {gifts.map((gift, index) => (
                        <BaseGiftCard
                            key={gift.id} {...gift}
                            footer={<GiverButton giftId={gift.id} giverId={gift.giverId}/>}
                            onClick={() => setSelectedGiftIndex(index)}
                        />
                    ))}
                </Flex>
            </Space>

            <GiftModal
                gift={selectedGiftIndex !== null ? gifts[selectedGiftIndex] : null}
                onClose={() => setSelectedGiftIndex(null)}
            />
        </SharedListLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const listId = params?.listId?.toString()

    const list = await getListById(listId)
    const inListGifts = await getInListGifts(list?.id)
    const userData = await getUserDataById(list?.userId)

    return {
        props: {
            list,
            userData,
            inListGifts,
        },
    }
}

export default SharedListPage