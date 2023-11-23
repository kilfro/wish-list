import { Gift } from '@/types/gift'
import { FC } from 'react'
import { Button, Col, Image, Row, Space, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { PriceFormatter } from '@/utils/format'
import { useQuery } from 'react-query'
import { getListById } from '@/api/lists/getListById'

interface Props {
    gift: Gift | undefined
}

const { Text, Title } = Typography

export const GiftInfo: FC<Props> = ({ gift }) => {
    const { data: list } = useQuery(['list', gift?.listId],  () =>  getListById(gift?.listId))

    return (
        <Row gutter={24} justify={'space-between'}>
            <Col span={12}>
                <Image src={gift?.imgUrl} width={'100%'} preview={false} style={{ borderRadius: 24 }}/>
            </Col>
            <Col span={12}>
                <Space direction={'vertical'} size={32}>
                    <Title level={2}>{gift?.name}</Title>

                    <Space direction={'vertical'} size={0}>
                        <Text type={'secondary'} style={{ fontSize: 24 }}>Цена:</Text>
                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                            }}
                        >
                            {PriceFormatter.format(Number(gift?.price))}
                        </Text>
                    </Space>

                    {!!list && <Space direction={'vertical'} size={0}>
                        <Text type={'secondary'} style={{ fontSize: 24 }}>В списке:</Text>
                        <Text
                            style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                            }}
                        >
                            {`${list?.emoji} ${list?.title}`}
                        </Text>
                    </Space>}

                    <a href={gift?.link} target={'_blank'}>
                        <Button size={'large'} type={'primary'} icon={<ShoppingCartOutlined/>} disabled={!gift?.link}>
                            Перейти в магазин
                        </Button>
                    </a>
                </Space>
            </Col>
        </Row>
    )
}