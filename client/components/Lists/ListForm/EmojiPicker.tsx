import { Avatar, Button, Col, Popover, Row } from 'antd'
import Picker from 'emoji-picker-react'
import { FC, useState } from 'react'

interface EmojiPickerProps {
    value: string | null | undefined
    onSelect: (value: string | null) => void
}

export const EmojiPicker: FC<EmojiPickerProps> = ({ value = null, onSelect }) => {
    const [isOpen, setOpen] = useState(false)

    return (
        <Row align={'middle'}>
            <Col>
                {
                    value
                        ? <span style={{ fontSize: 42 }}>{value}</span>
                        : <Avatar size={42}>?</Avatar>
                }
            </Col>
            <Col>
                <Popover
                    content={
                        <Picker
                            onEmojiClick={emoji => {
                                onSelect(emoji.emoji)
                                setOpen(false)
                            }}
                        />}
                    open={isOpen}
                    onOpenChange={setOpen}
                    trigger={'click'}
                >
                    <Button type={'link'}>
                        {value ? 'Изменить' : 'Выбрать эможди'}
                    </Button>
                </Popover>
            </Col>
            <Col>{value && <Button type={'link'} onClick={() => onSelect(null)}>Удалить</Button>}</Col>
        </Row>
    )
}