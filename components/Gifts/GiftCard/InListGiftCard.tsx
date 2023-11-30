import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import { MenuProps, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { BaseGiftCard } from '@/components/Gifts/GiftCard/BaseGiftCard'
import { GiftId } from '@/types/gift'
import { FC } from 'react'
import { updateGift } from '@/api/gifts/updateGift'

interface InListGiftCardProps {
    id: GiftId
    name: string
    imgUrl: string
    price?: number
}

export const InListGiftCard: FC<InListGiftCardProps> = (props) => {
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
            label: 'Удалить из списка',
            key: 1,
            icon: <DeleteOutlined/>,
            danger: true,
            onClick: () => {
                Modal.confirm({
                    title: `Удалить подарок "${giftData.name}" из списка`,
                    icon: <ExclamationCircleOutlined/>,
                    okText: 'Удалить',
                    okButtonProps: { type: 'primary', danger: true },
                    cancelText: 'Отменить',
                    onOk: () => {
                        updateGift(id, { listId: null }).then(() => queryClient.invalidateQueries('list_gifts'))
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