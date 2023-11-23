import { MenuProps, Modal } from 'antd'
import { FC } from 'react'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { GiftId } from '@/types/gift'
import { useQueryClient } from 'react-query'
import { BaseGiftCard } from '@/components/Gifts/GiftCard/BaseGiftCard'
import { deleteGift } from '@/api/gifts/deleteGift'

interface Props {
    id: GiftId
    name: string
    imgUrl: string
    price?: number
}

export const UserGiftCard: FC<Props> = (props) => {
    const { id, ...giftData } = props

    const router = useRouter()
    const queryClient = useQueryClient()

    const menuItems: MenuProps['items'] = [
        {
            label: 'Изменить',
            key: 0,
            icon: <EditOutlined/>,
            onClick: () => router.push({ pathname: '/user/gifts/edit', query: `giftId=${id}` }),
        },
        {
            label: 'Удалить',
            key: 1,
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: () => {
                Modal.confirm({
                    title: `Удалить подарок "${giftData.name}"`,
                    icon: <ExclamationCircleOutlined/>,
                    okText: 'Удалить',
                    okButtonProps: { type: 'primary', danger: true },
                    cancelText: 'Отменить',
                    onOk: () => {
                        deleteGift(id).then(() => queryClient.invalidateQueries('gifts'))
                    },
                })
            },
        },
    ]

    return (
        <BaseGiftCard
            {...giftData}
            menu={menuItems}
            onClick={() => router.push({
                pathname: '/user/gifts/[giftId]',
                query: { giftId: id },
            })}
        />
    )
}