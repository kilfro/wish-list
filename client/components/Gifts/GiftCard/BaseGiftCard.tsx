import { Button, Col, Dropdown, Flex, MenuProps, Row, Typography } from 'antd'
import { PriceFormatter } from '../../../utils/format'
import { FC, ReactNode } from 'react'
import { GiftImage } from '../GiftImage'
import { Card } from '../../common/Card'
import { GiftCardTitle } from './GiftCardTitle'
import { EllipsisOutlined } from '@ant-design/icons'

interface Props {
    imgUrl: string
    name: string
    price?: number | undefined
    onClick?: () => void
    menu?: MenuProps['items']
    footer?: ReactNode
}

export const BaseGiftCard: FC<Props> = ({ imgUrl, name, price, onClick, menu, footer }) => {

    return (
        <Card onClick={onClick}>

            {(menu && menu.length > 0) && (
                <Row justify={'end'} style={{ height: 0 }}>
                    <Col onClick={event => event.stopPropagation()}>
                        <Dropdown trigger={['click']} placement={'bottomRight'} menu={{ items: menu }}>
                            <Button
                                type={'link'}
                                shape={'circle'}
                                icon={<EllipsisOutlined/>}
                            />
                        </Dropdown>
                    </Col>
                </Row>
            )}

            <Flex vertical justify={'space-between'} style={{ height: '100%' }} gap={'small'}>
                <div>
                    <GiftImage url={imgUrl} radius={12}/>
                    <GiftCardTitle giftName={name}/>
                </div>

                <Typography
                    style={{
                        fontWeight: 'bold',
                        fontSize: 22,
                    }}
                >
                    {price ? PriceFormatter.format(price) : '-'}
                </Typography>

                {footer}
            </Flex>
        </Card>
    )
}