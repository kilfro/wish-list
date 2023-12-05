import { Gift } from '../../../types/gift'
import { FC } from 'react'
import { Button, Col, Flex, Image, Modal, Row, Space, Typography } from 'antd'
import { PriceFormatter } from '../../../utils/format'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { GiverButton } from '../GiverButton'

interface GiftModalProps {
    gift: Gift | null
    onClose: () => void
}

const { Text, Title } = Typography

export const GiftModal: FC<GiftModalProps> = ({ gift, onClose }) => {
    if (!gift) {
        return
    }

    return (
        <Modal open={!!gift} onCancel={onClose} destroyOnClose width={700} footer={null}>
            <Row gutter={24}>
                <Col span={12}>
                    <Flex vertical justify={'center'} style={{ height: '100%' }}>
                        <Image src={gift?.imgUrl} width={'100%'} preview={false} style={{ borderRadius: 24 }}/>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Space direction={'vertical'} size={32}>
                        <Title level={2}>{gift.name}</Title>

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

                        {gift?.link && <a href={gift.link} target={'_blank'}>
                            <Button
                                size={'large'}
                                type={'primary'}
                                icon={<ShoppingCartOutlined/>}
                            >
                                Перейти в магазин
                            </Button>
                        </a>}

                        <GiverButton giftId={gift.id} giverId={gift.giverId}/>
                    </Space>
                </Col>
            </Row>
        </Modal>
    )
}