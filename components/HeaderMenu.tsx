import { Avatar, Button, Dropdown, Flex, MenuProps } from 'antd'
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { AUTH } from '@/firebase/index'
import { useUserContext } from '@/context/userContext'

export const HeaderMenu = () => {
    const router = useRouter()
    const user = useUserContext()

    const items: MenuProps['items'] = [
        {
            label: 'Мои подарки',
            key: 'gifts',
            onClick: () => router.push('/user/gifts'),
        },
        {
            label: 'Вишлисты',
            key: 'lists',
            onClick: () => router.push('/user/lists'),
        },
        {
            label: 'Выйти',
            key: 'logout',
            danger: true,
            onClick: () => AUTH.signOut().then(() => router.push('/')),
        },
    ]

    return (
        <Flex justify={'space-between'} align={'center'}>
            <span style={{ fontSize: 36, cursor: 'pointer' }} onClick={() => router.push('/')}>🎁</span>

            <div>
                {user
                    ? (
                        <>
                            {user.photoURL
                                ? <Avatar src={user.photoURL}></Avatar>
                                : <Avatar icon={<UserOutlined/>}></Avatar>
                            }
                            <Dropdown menu={{ items }}>
                                <Button type={'text'} style={{ color: 'white' }} icon={<DownOutlined/>}/>
                            </Dropdown>
                        </>
                    )
                    : <Button
                        type={'text'}
                        shape={'circle'}
                        style={{ color: 'white' }}
                        icon={<LoginOutlined/>}
                        onClick={() => router.push('/login')}
                    />
                }
            </div>
        </Flex>
    )
}