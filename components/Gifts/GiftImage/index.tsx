import { FC } from 'react'

interface Props {
    url: string
    radius?: number
    size?: number
}

export const GiftImage: FC<Props> = ({ url, radius = 0, size = 250 }) => (
    <div
        style={{
            height: size,
            width: size,
            borderRadius: radius,
            backgroundImage: `url(${url})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPositionX: 'center',
            backgroundPositionY: 'center',
        }}
    />
)