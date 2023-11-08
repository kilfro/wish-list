import { GiftId } from '@/types/gift'
import { FC } from 'react'
import { Button } from 'antd'
import { AUTH } from '@/firebase/index'
import { useRouter } from 'next/router'

interface Props {
    giftId: GiftId
    giverId: string | undefined
}

export const GiftSelector: FC<Props> = ({ giftId, giverId }) => {
    const router = useRouter()

    const onChooseGiftHandler = (giftId: string) => {
        if (!AUTH.currentUser) {
            router.push('/login')
        } else {

        }

        console.log('Chosen', giftId)
    }

    return (
        <Button
            type={'primary'}
            onClick={event => {
                event.stopPropagation()
                onChooseGiftHandler(giftId)
            }}
        >
            Подарить
        </Button>
    )
}