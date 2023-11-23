import { useQuery } from 'react-query'
import { Col, Row } from 'antd'
import { Gift } from '@/types/gift'
import { UserGiftCard } from '@/components/Gifts/GiftCard/UserGiftCard'
import { UserLayout } from '@/components/User/UserLayout'
import { CardButton } from '@/components/common/CardButton'
import { PlusCircleOutlined } from '@ant-design/icons'
import { getUserGifts } from '@/api/gifts/getUserGifts'

export const Gifts = () => {
    const { data: gifts = [] } = useQuery<Array<Gift>>('gifts', getUserGifts)

    return (
        <UserLayout>
            <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                <Col>
                    <CardButton icon={<PlusCircleOutlined/>} text={'Добавить подарок'} link={'/user/gifts/new'}/>
                </Col>

                {gifts.map(gift => (
                    <Col key={gift.id}>
                        <UserGiftCard {...gift}/>
                    </Col>
                ))}
            </Row>
        </UserLayout>
    )
}

export default Gifts