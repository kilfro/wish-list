import { UserLayout } from '@/components/User/UserLayout'
import { GiftForm } from '@/components/Gifts/GiftForm'
import { Gift } from '@/types/gift'
import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { getGiftById } from '@/api/gifts/getGiftById'

interface Props {
    gift: Gift | undefined
}

const EditGiftPage: FC<Props> = ({ gift }) => {
    return (
        <UserLayout>
            <GiftForm gift={gift}/>
        </UserLayout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const gift = await getGiftById(context.query.giftId?.toString())

    return {
        props: {
            gift,
        },
    }
}

export default EditGiftPage