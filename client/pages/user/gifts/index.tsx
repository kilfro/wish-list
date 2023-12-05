import { useQuery } from 'react-query'
import { Flex } from 'antd'
import { Gift } from '../../../types/gift'
import { UserGiftCard } from '../../../components/Gifts/GiftCard/UserGiftCard'
import { UserLayout } from '../../../components/User/UserLayout'
import { CardButton } from '../../../components/common/CardButton'
import { PlusCircleOutlined } from '@ant-design/icons'
import { getUserGifts } from '../../../api/gifts/getUserGifts'
import { useUserContext } from '../../../context/userContext'

export const Gifts = () => {
    const user = useUserContext()

    const { data: gifts = [] } = useQuery<Array<Gift>>(['gifts', user?.uid], () => getUserGifts(user?.uid), {
        enabled: !!user?.uid,
    })

    return (
        <UserLayout entities={gifts}>
            <Flex justify={'start'} wrap={'wrap'} gap={12} align={'stretch'}>
                <CardButton icon={<PlusCircleOutlined/>} text={'Добавить подарок'} link={'/user/gifts/new'}/>

                {gifts.map(gift => (
                    <UserGiftCard {...gift} key={gift.id}/>
                ))}
            </Flex>
        </UserLayout>
    )
}

export default Gifts