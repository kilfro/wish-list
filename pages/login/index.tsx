import { Button, Flex } from 'antd'
import { GoogleIcon } from '@/components/icons/GoogleIcon'
import { signInGoogle } from '@/firebase/authentication/google'
import Icon from '@ant-design/icons'

const LoginPage = () => {
    return (
        <Flex style={{ width: 300, margin: '0 auto', paddingTop: '10%' }} vertical align={'center'} gap={24}>
            <span style={{ fontSize: 72 }}>🎁</span>
            <Button icon={<Icon component={GoogleIcon}/>} onClick={signInGoogle}>
                Войти через Google
            </Button>
        </Flex>
    )
}

export default LoginPage