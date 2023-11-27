import { useRouter } from 'next/router'
import { Button, Col, Dropdown, Empty, Flex, MenuProps, message, Modal, Row, Space, Typography } from 'antd'
import { useQuery, useQueryClient } from 'react-query'
import { UserLayout } from '@/components/User/UserLayout'
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
    ShareAltOutlined,
} from '@ant-design/icons'
import { UserGiftCard } from '@/components/Gifts/GiftCard/UserGiftCard'
import { ListForm } from '@/components/Lists/ListForm'
import { FC, useState } from 'react'
import { deleteWishList } from '@/api/lists/deleteWishList'
import { getListById } from '@/api/lists/getListById'
import { getInListGifts } from '@/api/gifts/getInListGifts'
import { GetServerSideProps } from 'next'
import { List } from '@/types/list'
import { Gift } from '@/types/gift'

interface ListPageProps {
    list: List | undefined
    giftsInList: Array<Gift>
}

const ListPage: FC<ListPageProps> = ({ list, giftsInList }) => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const listId = router.query.listId?.toString()

    const { data: listData } = useQuery(['list', listId], () => getListById(listId), {
        enabled: !!listId,
        initialData: list,
    })

    const {
        data: gifts = [],
    } = useQuery(['list_gifts', listData?.id], () => getInListGifts(listData?.id), {
        enabled: !!listData?.id,
        initialData: giftsInList,
    })

    const [messageApi, contextHolder] = message.useMessage()

    const shareHandler = () => {
        navigator.clipboard
            .writeText(`http://localhost:3000/lists/${listData?.id}`)
            .then(() => messageApi.open({
                type: 'info',
                content: 'Ссылка на вишлист скопированна в буфер обмена',
            }))
    }

    const menuItems: MenuProps['items'] = [
        {
            label: 'Изменить',
            key: 0,
            icon: <EditOutlined/>,
            onClick: () => setIsOpenEditModal(true),
        },
        {
            label: 'Удалить',
            key: 1,
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: () => {
                Modal.confirm({
                    title: `Удалить вишлист "${listData?.title}"`,
                    icon: <ExclamationCircleOutlined/>,
                    okText: 'Удалить',
                    okButtonProps: { type: 'primary', danger: true },
                    cancelText: 'Отменить',
                    onOk: async () => {
                        await deleteWishList(listData?.id)
                        await queryClient.invalidateQueries('lists')
                        router.back()
                    },
                })
            },
        },
    ]

    return (
        <UserLayout>
            {contextHolder}

            <Row style={{ marginBottom: 12 }} justify={'space-between'}>
                <Col>
                    <Button
                        type={'link'}
                        icon={<ArrowLeftOutlined/>}
                        onClick={() => router.back()}
                    >
                        Вернуться
                    </Button>
                </Col>
            </Row>

            <Space
                direction={'vertical'}
                style={{ backgroundColor: 'white', borderRadius: 36, padding: 24, width: '100%' }}
            >
                <Row justify={'space-between'} align={'middle'}>
                    <Col>
                        <Typography.Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 28,
                            }}
                        >{`${listData?.emoji} ${listData?.title}`}</Typography.Text>
                    </Col>
                    <Col>
                        <Flex gap={'middle'} justify={'space-between'} align={'center'}>
                            <Dropdown trigger={['click']} placement={'bottomRight'} menu={{ items: menuItems }}>
                                <Button type={'text'} shape={'circle'} icon={<EllipsisOutlined/>}/>
                            </Dropdown>

                            <Button
                                shape={'circle'}
                                type={'primary'}
                                icon={<ShareAltOutlined/>}
                                onClick={shareHandler}
                            />
                        </Flex>
                    </Col>
                </Row>

                <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                    {gifts.length === 0 && (
                        <Empty
                            style={{ width: '100%', margin: '20px 0' }}
                            description={'Не добавленно ни одного подарка'}
                        />
                    )}

                    {gifts.map(gift => (
                        <Col key={gift.id}>
                            <UserGiftCard {...gift}/>
                        </Col>
                    ))}
                </Row>
            </Space>

            <ListForm isOpen={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} list={listData}/>
        </UserLayout>
    )
}

export const getServerSideProps: GetServerSideProps<ListPageProps> = async (context) => {
    const listId = context.params?.listId?.toString()

    const list = await getListById(listId)
    const giftsInList = await getInListGifts(list?.id)

    return {
        props: {
            list,
            giftsInList,
        },
    }
}

export default ListPage