import { MenuProps, Modal } from 'antd'
import { FC } from 'react'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { GiftId } from '@/types/gift'
import { deleteGift } from '@/firebase/db/gifts'
import { useQueryClient } from 'react-query'
import { BaseGiftCard } from '@/components/Gifts/GiftCard/BaseGiftCard'

interface Props {
    id: GiftId
    name: string
    imgUrl: string
    price?: number
}

export const GiftCard: FC<Props> = (props) => {
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
            onClick={() => router.push(`/user/gifts/${id}`)}
            menu={menuItems}
        />
    )
}