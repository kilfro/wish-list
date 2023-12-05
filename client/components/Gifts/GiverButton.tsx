import { GiftId } from '../../types/gift'
import { FC, MouseEventHandler } from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { CloseCircleTwoTone } from '@ant-design/icons'
import { useQueryClient } from 'react-query'
import { useUserContext } from '../../context/userContext'
import { toggleGiver } from '../../api/gifts/toggleGiver'

interface Props {
    giftId: GiftId
    giverId: string | undefined | null
}

export const GiverButton: FC<Props> = ({ giftId, giverId = null }) => {
    const user = useUserContext()
    const router = useRouter()
    const queryClient = useQueryClient()

    const onToggleGiftHandler: MouseEventHandler<HTMLElement> = (event) => {
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

    if (!giverId) {
        return <Button type={'primary'} onClick={onToggleGiftHandler}>Подарить</Button>
    } else if (!!user && user.uid === giverId) {
        return <Button type={'text'} style={{color: 'green'}} onClick={onToggleGiftHandler}>Вы выбрали этот подарок</Button>
    }

    return (
        <Button type={'text'} icon={<CloseCircleTwoTone twoToneColor='#ff4d4f'/>}>
            Подарок уже забронирован
        </Button>
    )
}