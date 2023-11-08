import { Typography } from 'antd'
import { FC } from 'react'

interface Props {
    giftName: string
}

export const GiftCardTitle: FC<Props> = ({ giftName }) => {
    return (
        <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            style={{ fontWeight: 'bold', fontSize: 16, margin: '8px 0', height: 51 }}
        >
            {giftName}
        </Typography.Paragraph>
    )
}