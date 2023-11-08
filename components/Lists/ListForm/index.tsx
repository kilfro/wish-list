import { FC, useState } from 'react'
import { Avatar, Button, Col, DatePicker, Form, Input, Modal, Popover, Row } from 'antd'
import EmojiPicker from 'emoji-picker-react'
import dayjs, { Dayjs } from 'dayjs'
import { createList, updateList } from '@/firebase/db/lists'
import { List, ListFormType } from '@/types/list'
import { useQueryClient } from 'react-query'
import { useUserContext } from '@/context/userContext'

interface FormProps {
    isOpen: boolean
    onClose: () => void
    list?: List
}

const { Item, useForm } = Form

export const ListForm: FC<FormProps> = ({ isOpen, onClose, list }) => {
    const [listForm] = useForm()
    const user = useUserContext()
    const queryClient = useQueryClient()

    const [emoji, setEmoji] = useState<string | null>(list?.emoji || null)
    const [date, setDate] = useState<Dayjs | null>(!!list?.date ? dayjs(list.date) : null)
    const [title, setTitle] = useState<string>(list?.title || '')
    const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false)


    const saveHandler = async () => {
        const reqList: ListFormType = {
            //TODO undefined
            userId: user?.uid || '',
            title,
            emoji,
            date: date?.toDate().getTime() || null,
            createdTime: list?.createdTime || Date.now(),
        }

        try {
            if (!!list) {
                await updateList(list.id, reqList)
            } else {
                await createList(reqList)
            }
        } finally {
            queryClient.invalidateQueries('lists')
            onClose()
        }

    }

    const cancelHandler = () => {
        if (!list) {
            setEmoji(null)
            setDate(null)
            setTitle('')
        }

        onClose()
    }

    const chooseEmojiHandler = (emoji: string) => {
        listForm.setFieldValue('emoji', emoji)
    }

    return (
        <Modal
            title={'Новый список'}
            open={isOpen}
            onCancel={cancelHandler}
            afterClose={listForm.resetFields}
            footer={[
                <Button key={'submit'} type={'primary'} onClick={listForm.submit}>Сохранить</Button>,
            ]}
        >
            <Form layout={'vertical'} form={listForm} onFinish={saveHandler}>
                <Item hidden name={'emoji'}>
                    <Input/>
                </Item>
                <Item>
                    <Row align={'middle'}>
                        <Col>
                            {
                                emoji
                                    ? <span style={{ fontSize: 42 }}>{emoji}</span>
                                    : <Avatar size={42}>?</Avatar>
                            }
                        </Col>
                        <Col>
                            <Popover
                                content={
                                    <EmojiPicker
                                        onEmojiClick={emoji => {
                                            setEmoji(emoji.emoji)
                                            setEmojiPickerIsOpen(false)
                                        }}
                                    />}
                                open={emojiPickerIsOpen}
                            >
                                <Button
                                    type={'link'}
                                    onClick={() => setEmojiPickerIsOpen(true)}
                                >
                                    {emoji ? 'Изменить' : 'Выбрать эможди'}
                                </Button>
                            </Popover>
                        </Col>
                        <Col>{emoji && <Button type={'link'} onClick={() => setEmoji(null)}>Удалить</Button>}</Col>
                    </Row>
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