import { UserLayout } from '@/components/User/UserLayout'
import { GiftForm } from '@/components/Gifts/GiftForm'
import { getGiftById } from '@/firebase/db/gifts'
import { Gift } from '@/types/gift'
import { FC } from 'react'
import { GetServerSideProps } from 'next'

interface Props {
    gift: Gift
}

const EditGiftPage: FC<Props> = ({ gift }) => {
    return (
        <UserLayout>
            <GiftForm gift={gift}/>
        </UserLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    let gift: Gift = await getGiftById(context.query.giftId?.toString() || '')

    return {
        props: {
            gift,
        },
    }
}

export default EditGiftPage