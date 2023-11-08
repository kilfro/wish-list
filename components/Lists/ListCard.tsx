import { List } from '@/types/list'
import { FC, useState } from 'react'
import type { MenuProps } from 'antd'
import { Avatar, Button, Card, Col, Dropdown, Modal, Row, Space, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, EllipsisOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { deleteList } from '@/firebase/lists'
import { ListForm } from '@/components/ListCard/ListForm'
import { useQueryClient } from 'react-query'

type CardProps = List

const { Text, Title } = Typography

export const ListCard: FC<CardProps> = (props) => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const queryClient = useQueryClient()

    const { id, title, date, emoji } = props

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
                        deleteList(id)
                        queryClient.invalidateQueries('lists')
                    },
                })
            },
        },
    ]

    return (
        <>
            <Card style={{ width: 300, height: 400 }}>
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
                    <Col>
                        <Dropdown trigger={['click']} placement={'bottomRight'} menu={{ items: menuItems }}>
                            <Button type={'text'} shape={'circle'} icon={<EllipsisOutlined/>}/>
                        </Dropdown>
                    </Col>
                </Row>

                <Space direction={'vertical'} size={16}>
                    <Title level={3}>{title}</Title>

                    <Row gutter={8} justify={'start'}>
                        <Col>
                            <Text type={'secondary'}>{date}</Text>
                        </Col>
                        <Col>
                            <Text type={'secondary'}>Подарков: 0</Text>
                        </Col>
                    </Row>

                    <Row gutter={[12, 12]}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Col key={index}>
                                <Avatar size={72} style={{ backgroundColor: 'rgba(128,128,128,0.3)' }}/>
                            </Col>
                        ))}
                    </Row>
                </Space>
            </Card>

            <ListForm isOpen={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} list={props}/>
        </>
    )
}