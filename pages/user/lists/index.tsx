import { FC, useState } from 'react'
import { ListCard } from '@/components/Lists/ListCard'
import { Button, Col, Row } from 'antd'
import { ListForm } from '@/components/Lists/ListForm'
import { getLists } from '@/firebase/lists'
import { useQuery } from 'react-query'
import { List } from '@/types/list'

export const Lists: FC = () => {
    const { data: lists = [] } = useQuery<Array<List>>('lists', getLists)

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false)

    return (
        <>
            <Button type={'dashed'} style={{ width: '100%' }} onClick={() => setIsOpenCreateModal(true)}>Новый
                список</Button>

            <Row gutter={[12, 12]} justify={'start'} style={{ margin: '12px 0' }}>
                {lists.map(list => (
                    <Col key={list.id}>
                        <ListCard {...list}/>
                    </Col>
                ))}
            </Row>

            <ListForm isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)}/>
        </>
    )
}