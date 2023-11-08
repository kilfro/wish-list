import { useQuery } from 'react-query'
import { Button, Col, Row } from 'antd'
import { getGifts } from '@/firebase/gifts'
import { Gift } from '@/types/gift'
import { GiftCard } from '@/components/Gifts/GiftCard'

export const Gifts = () => {
    const { data: gifts = [] } = useQuery<Array<Gift>>('gifts', getGifts)

    return (
        <>
            <Button type={'dashed'} style={{ width: '100%' }}>Добавить подарок</Button>

            <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                {gifts.map(gift => (
                    <Col key={gift.id}>
                        <GiftCard {...gift}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}