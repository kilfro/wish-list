import { GiftId } from '@/types/gift'
import { FC, MouseEventHandler } from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { useQueryClient } from 'react-query'
import { useUserContext } from '@/context/userContext'
import { toggleGiver } from '@/api/gifts/toggleGiver'

interface Props {
    giftId: GiftId
    giverId: string | undefined | null
}

export const GiverButton: FC<Props> = ({ giftId, giverId = null }) => {
    const user = useUserContext()
    const router = useRouter()
    const queryClient = useQueryClient()

    const onChooseGiftHandler: MouseEventHandler<HTMLElement> = (event) => {
        event.stopPropagation()

        if (!user) {
            router.push('/login')
        } else {
            toggleGiver(giftId)
                .then(() => {
                    queryClient.invalidateQueries('gifts')
                })
        }
    }

    if (!!giverId && !!user && (user.uid !== giverId)) {
        return (
            <Button type={'text'} icon={<CheckCircleTwoTone twoToneColor='#52c41a'/>}>
                Подарок уже забронирован
            </Button>
        )
    }

    return (
        <Button
            type={!!giverId ? 'text' : 'primary'}
            danger={!!giverId}
            onClick={onChooseGiftHandler}
        >
            {!!giverId ? 'Отменить выбор' : 'Подарить'}
        </Button>
    )
}