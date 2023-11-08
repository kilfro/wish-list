import React from 'react'
import { Button, Result } from 'antd'
import { useRouter } from 'next/router'

const NotFoundPage = () => {
    const router = useRouter()

    return (
        <Result
            status='404'
            title='404'
            subTitle='Такой страницы не существует.'
            extra={
                <Button type='primary' onClick={router.back}>
                    Вернуться назад
                </Button>
            }
        />
    )
}

export default NotFoundPage