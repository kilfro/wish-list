import { UserLayout } from '../../../components/User/UserLayout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Gift } from '../../../types/gift'
import { FC } from 'react'
import { GiftInfo } from '../../../components/Gifts/GiftInfo'
import { Button, Col, Dropdown, MenuProps, Modal, Row, Space } from 'antd'
import {
    ArrowLeftOutlined,
    DeleteOutlined,
    EditOutlined,
    EllipsisOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useRouter } from 'next/router'
import { deleteGift } from '../../../api/gifts/deleteGift'
import { getGiftById } from '../../../api/gifts/getGiftById'
import { getAllGiftsIds } from '../../../api/gifts/getAllGiftsIds'

interface Props {
    gift: Gift | undefined
}

const GiftPage: FC<Props> = (props) => {
    const router = useRouter()

    const menuItems: MenuProps['items'] = [
        {
            label: 'Изменить',
            key: 0,
            icon: <EditOutlined/>,
            onClick: () => router.push({ pathname: '/user/gifts/edit', query: `giftId=${props.gift?.id}` }),
        },
        {
            label: 'Удалить',
            key: 1,
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: () => {
                Modal.confirm({
                    title: `Удалить подарок "${name}"`,
                    icon: <ExclamationCircleOutlined/>,
                    okText: 'Удалить',
                    okButtonProps: { type: 'primary', danger: true },
                    cancelText: 'Отменить',
                    onOk: () => {
                        deleteGift(props.gift?.id).then(() => router.back())
                    },
                })
            },
        },
    ]

    return (
        <UserLayout>

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
                <Col>
                    <Dropdown trigger={['click']} placement={'bottomRight'} menu={{ items: menuItems }}>
                        <Button type={'text'} shape={'circle'} icon={<EllipsisOutlined/>}/>
                    </Dropdown>
                </Col>
            </Row>

            <Space direction={'vertical'} style={{ backgroundColor: 'white', borderRadius: 36, padding: 24 }}>
                <GiftInfo {...props} />
            </Space>
        </UserLayout>
    )
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
    const gift = await getGiftById(context.params?.giftId?.toString())

    return { props: { gift } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const ids = await getAllGiftsIds()
    const paths = ids.map(id => ({ params: { giftId: id } }))

    return { paths, fallback: false }
}

export default GiftPage