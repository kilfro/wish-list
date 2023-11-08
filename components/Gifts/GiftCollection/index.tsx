import { Gift } from '@/types/gift'
import { FC } from 'react'
import { Flex } from 'antd'

interface Props {
    gifts: Array<Gift>
}

export const GiftCollection: FC<Props> = ({ gifts }) => {
    const sources = gifts.map(gift => gift.imgUrl)

    return (
        <Flex justify={'space-between'} wrap={'wrap'} gap={'middle'}>

            {sources.map((url, index) => (
                <div
                    style={{
                        width: 72,
                        height: 72,
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <img key={index} src={url} style={{ maxHeight: '100%', maxWidth: '100%' }}/>
                </div>
            ))}
        </Flex>
    )
}