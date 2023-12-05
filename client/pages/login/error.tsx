import { useRouter } from 'next/router'
import { Button, Result } from 'antd'
import React from 'react'

const LoginError = () => {
    const router = useRouter()

    return (
        <Result
            status='500'
            title='Ошибка авторизации'
            extra={
                <Button type='primary' onClick={() => router.push('/login')}>
                    Попробовать еще раз
                </Button>
            }
        />
    )
}

export default LoginError