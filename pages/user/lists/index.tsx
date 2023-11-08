import React, { FC, useState } from 'react'
import { ListCard } from '@/components/Lists/ListCard'
import { Col, Dropdown, Flex, MenuProps, Row, Space, Typography } from 'antd'
import { ListForm } from '@/components/Lists/ListForm'
import { getUserLists } from '@/firebase/db/lists'
import { useQuery } from 'react-query'
import { List } from '@/types/list'
import { UserLayout } from '@/components/User/UserLayout'
import { CardButton } from '@/components/common/CardButton'
import { DownOutlined, PlusCircleOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons'
import { Order } from '@/types/common'
import { ItemType } from 'rc-collapse/lib/interface'

const sorter: { [key: string]: string } = {
    createdTime: 'По дате создания',
    date: 'По дате события',
    title: 'По названию',
}

export const Lists: FC = () => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)
    const [sortBy, setSortBy] = useState('title')
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
        <UserLayout>
            <Row style={{paddingLeft: 12}}>
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
            <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                <Col>
                    <CardButton
                        icon={<PlusCircleOutlined/>}
                        text={'Новый список'}
                        onClick={() => setIsOpenCreateModal(true)}
                    />
                </Col>

                {lists.map(list => (
                    <Col key={list.id}>
                        <ListCard {...list}/>
                    </Col>
                ))}
            </Row>

            <ListForm isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)}/>
        </UserLayout>
    )
}

export default Lists