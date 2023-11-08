import { FC, useEffect } from 'react'
import { Button, DatePicker, Form, Input, Modal } from 'antd'
import { List, ListCreateType, ListFormType } from '@/types/list'
import { useQueryClient } from 'react-query'
import { useUserContext } from '@/context/userContext'
import { EmojiPicker } from '@/components/Lists/ListForm/EmojiPicker'
import { createList, updateList } from '@/firebase/db/lists'
import dayjs from 'dayjs'

interface FormProps {
    isOpen: boolean
    onClose: () => void
    list?: List
}

const { Item, useForm, useWatch } = Form

export const ListForm: FC<FormProps> = ({ isOpen, onClose, list }) => {
    const [listForm] = useForm<ListFormType>()
    const emojiValue = useWatch('emoji', listForm)

    const user = useUserContext()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (list) {
            const { date, title, emoji } = list
            listForm.setFieldsValue({
                title,
                emoji,
                date: dayjs(date),
            })
        }
    }, [list, isOpen])

    const saveListHandler = async (values: ListFormType) => {
        const { date, ...commonFields } = values

        const listData: ListCreateType = {
            ...commonFields,
            date: date?.toDate().getTime() || null,
        }

        try {
            if (!!list) {
                await updateList(list.id, listData)
            } else {
                await createList({
                    ...listData,
                    createdTime: Date.now(),
                    userId: user?.uid || '',
                })
            }
        } finally {
            await queryClient.invalidateQueries('lists')
            await queryClient.invalidateQueries('list')
            onClose()
        }
    }

    const chooseEmojiHandler = (emoji: string | null) => {
        listForm.setFieldValue('emoji', emoji)
    }

    return (
        <Modal
            title={list ? 'Изменить список' : 'Новый список'}
            open={isOpen}
            onCancel={onClose}
            afterClose={listForm.resetFields}
            footer={[
                <Button key={'submit'} type={'primary'} onClick={listForm.submit}>Сохранить</Button>,
            ]}
            styles={{ content: { borderRadius: 24 }, mask: { backgroundColor: 'rgba(25,90,110,0.28)' } }}
        >
            <Form layout={'vertical'} form={listForm} onFinish={saveListHandler}>
                <Item hidden name={'emoji'}>
                    <Input/>
                </Item>
                <Item>
                    <EmojiPicker value={emojiValue} onSelect={chooseEmojiHandler}/>
                </Item>
                <Item label={'Название списка'} name={'title'} required rules={[{ required: true }]}>
                    <Input/>
                </Item>
                <Item label={'Дата'} name={'date'}>
                    <DatePicker format={'DD.MM.YYYY'} style={{ minWidth: '50%' }}/>
                </Item>
            </Form>
        </Modal>
    )
}