import { FC } from 'react'

interface Props {
    url: string
}

export const GiftPreview: FC<Props> = ({ url }) => {
    return (
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
            <img src={url} style={{ maxHeight: '100%', maxWidth: '100%' }}/>
        </div>
    )
}