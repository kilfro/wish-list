import { List } from '@/types/list'
import { FC, useState } from 'react'
import type { MenuProps } from 'antd'
import { Avatar, Button, Card, Col, Dropdown, Modal, Row, Space, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { deleteList } from '@/firebase/db/lists'
import { ListForm } from '@/components/Lists/ListForm'
import { useQuery, useQueryClient } from 'react-query'
import { GiftCollection } from '../Gifts/GiftCollection'
import { getListGifts } from '@/firebase/db/gifts'
import { useRouter } from 'next/router'

type CardProps = List

const { Text, Title } = Typography

export const ListCard: FC<CardProps> = (props) => {
    const { id, title, date, emoji } = props

    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const router = useRouter()
    const queryClient = useQueryClient()

    const { data: gifts = [] } = useQuery(['list_gifts', id], () => getListGifts(id), {
        enabled: !!id,
    })

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
                    title: `Удалить вишлист "${title}"`,
                    icon: <ExclamationCircleOutlined/>,
                    okText: 'Удалить',
                    okButtonProps: { type: 'primary', danger: true },
                    cancelText: 'Отменить',
                    onOk: () => {
                        deleteList(id).then(() => queryClient.invalidateQueries('lists'))
                    },
                })
            },
        },
    ]

    return (
        <>
            <Card
                style={{ width: 300, height: 400, borderRadius: 24 }}
                hoverable
                onClick={() => router.push({
                    pathname: '/user/lists/[listId]',
                    query: { listId: id },
                })}
            >
                <Row justify={'space-between'}>
                    <Col>
                        <Avatar
                            style={{
                                backgroundColor: emoji ? 'rgba(256,256,256,0.0)' : 'rgba(229,209,178,0.5)',
                                fontSize: emoji ? 42 : 24,
                            }}
                            size={42}
                        >{emoji ? emoji : '?'}</Avatar>
                    </Col>
                    <Col onClick={event => event.stopPropagation()}>
                        <Dropdown trigger={['click']} placement={'bottomRight'} menu={{ items: menuItems }}>
                            <Button type={'text'} shape={'circle'} icon={<EllipsisOutlined/>}/>
                        </Dropdown>
                    </Col>
                </Row>

                <Space direction={'vertical'} size={16}>
                    <Title level={3}>{title}</Title>

                    <Row gutter={8} justify={'start'}>
                        {date && <Col>
                            <Text type={'secondary'}>{new Date(date).toLocaleDateString()}</Text>
                        </Col>}
                        <Col>
                            <Text type={'secondary'}>Подарков: {gifts.length}</Text>
                        </Col>
                    </Row>

                    <GiftCollection gifts={gifts}/>
                </Space>
            </Card>

            <ListForm isOpen={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} list={props}/>
        </>
    )
}