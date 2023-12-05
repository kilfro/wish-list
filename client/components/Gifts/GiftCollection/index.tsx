import { Gift } from '../../../types/gift'
import { FC } from 'react'
import { Avatar, Flex } from 'antd'
import { GiftPreview } from './GiftPreview'
import { QuestionOutlined } from '@ant-design/icons'

interface Props {
    gifts: Array<Gift>
}

export const GiftCollection: FC<Props> = ({ gifts }) => {
    let sources = gifts.map(gift => gift.imgUrl)

    if (sources.length > 6) {
        sources = sources.slice(0, 5)
    }

    return (
        <Flex justify={'start'} wrap={'wrap'} gap={'middle'}>
            {
                gifts.length > 0
                    ? sources.map((url, index) => (
                        <GiftPreview key={index} url={url}/>
                    ))
                    : Array.from({ length: 6 }).map((_, index) => (
                        <Avatar key={index} size={72} icon={<QuestionOutlined/>}/>
                    ))
            }

            {gifts.length > 6 &&
                <Avatar size={72}>
                    <span style={{ fontSize: 18, fontWeight: 'bold' }}>+{gifts.length - 5}</span>
                </Avatar>
            }
        </Flex>
    )
}