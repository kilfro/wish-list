import { CSSProperties, FC, ReactNode } from 'react'
import styles from './card.module.css'

interface Props {
    children: ReactNode
    onClick?: () => void
    style?: CSSProperties

}

export const Card: FC<Props> = (props) => {
    const { children, ...restProps } = props

    return (
        <div className={styles.card} {...restProps}>
            {children}
        </div>
    )
}