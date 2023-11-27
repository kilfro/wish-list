import React, { FC, useState } from 'react'
import { ListCard } from '@/components/Lists/ListCard'
import { Dropdown, Flex, MenuProps, Row, Space, Typography } from 'antd'
import { ListForm } from '@/components/Lists/ListForm'
import { useQuery } from 'react-query'
import { List } from '@/types/list'
import { UserLayout } from '@/components/User/UserLayout'
import { CardButton } from '@/components/common/CardButton'
import { DownOutlined, PlusCircleOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import { Order } from '@/types/common'
import { ItemType } from 'rc-collapse/lib/interface'
import { getUserLists } from '@/api/lists/getUserLists'

const sorter: { [key: string]: string } = {
    createdTime: 'По дате создания',
    date: 'По дате события',
    title: 'По названию',
}

export const Lists: FC = () => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [sortBy, setSortBy] = useState('createdTime')
    const [order, setOrder] = useState<Order>(Order.DESC)

    const { data: lists = [] } = useQuery<Array<List>>(['lists', sortBy, order], () => getUserLists(sortBy, order))

    const selectSortHandler = ({ key }: ItemType) => {
        setSortBy(key?.toString() || '')
        setOrder(prev => prev === Order.DESC ? Order.ASC : Order.DESC)
    }

    const items: MenuProps['items'] = [
        {
            key: 'createdTime',
            label: (
                <Flex justify={'space-between'} gap={'large'} style={{ width: '100%' }}>
                    <span>По дате создания</span>
                    {sortBy === 'createdTime' && (order === Order.ASC ? <SortAscendingOutlined/> :
                        <SortDescendingOutlined/>)}
                </Flex>
            ),
        },
        {
            key: 'date',
            label: (
                <Flex justify={'space-between'} gap={'large'} style={{ width: '100%' }}>
                    <span>По дате события</span>
                    {sortBy === 'date' && (order === Order.ASC ? <SortAscendingOutlined/> : <SortDescendingOutlined/>)}
                </Flex>
            ),
        },
        {
            key: 'title',
            label: (
                <Flex justify={'space-between'} gap={'large'} style={{ width: '100%' }}>
                    <span>По названию</span>
                    {sortBy === 'title' && (order === Order.ASC ? <SortAscendingOutlined/> : <SortDescendingOutlined/>)}
                </Flex>
            ),
        },
    ].map(item => ({
        ...item, onClick: selectSortHandler,
    }))

    return (
        <UserLayout entities={[]}>
            <Space direction={'vertical'}>
                <Row style={{ paddingLeft: 24, width: '100%', marginBottom: 12 }}>
                    <Dropdown
                        menu={{
                            items,
                            selectable: true,
                            selectedKeys: [sortBy],
                        }}
                        trigger={['click']}
                        overlayStyle={{ minWidth: 200 }}
                    >
                        <Typography.Link>
                            <Space>
                                {sorter[sortBy]}
                                <DownOutlined/>
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Row>

                <Flex gap={12} justify={'start'} wrap={'wrap'} align={'stretch'}>
                    <CardButton
                        icon={<PlusCircleOutlined/>}
                        text={'Новый список'}
                        onClick={() => setIsOpenCreateModal(true)}
                    />

                    {lists.map(list => (
                        <ListCard {...list} key={list.id}/>
                    ))}
                </Flex>
            </Space>

            <ListForm isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)}/>
        </UserLayout>
    )
}

export default Lists