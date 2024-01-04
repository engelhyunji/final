import React, { ChangeEvent, useState } from 'react'
import * as ST from './style'
import { useMutation, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { addChat } from '../../apis/api/chat'

interface AddChatModalProps {
    onClose: () => void
}

const AddChatModal: React.FC<AddChatModalProps> = ({ onClose }) => {
    const queryClient = useQueryClient()

    const [roomName, setRoomName] = useState<string>('')

    const addChatMutation = useMutation<void, AxiosError, { name: string }>(({ name }) => addChat({ name }), {
        onSuccess: () => {
            setRoomName('')
            onClose()
            queryClient.invalidateQueries('getChatList')
        },
        onError: () => {
            alert('채팅방 생성에 실패했습니다.')
        },
    })

    const createRoom = async (): Promise<void> => {
        if (roomName === '') {
            alert('방 제목을 입력해 주세요.')
            return
        } else if (roomName.length > 12) {
            alert('방 제목은 12자 이내로 입력해 주세요.')
            return
        } else {
            const params = new URLSearchParams()
            params.append('name', roomName)
            addChatMutation.mutate({ name: roomName })
        }
    }
    return (
        <ST.StBackground>
            <ST.ChatInputDiv>
                <ST.TitleH2>새로운 채팅방 만들기</ST.TitleH2>
                <ST.MyChatSpan>한 아이디 당 최대 두 개의 채팅방을 만들 수 있어요</ST.MyChatSpan>
                <ST.ChatNameInput
                    placeholder="만들 채팅방 이름을 입력해주세요 (최대 12자)"
                    type="text"
                    value={roomName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                />
                <div>
                    <ST.ChatBtn $textColor="#00bd8f" $buttonColor="#eee" $marginRight="13px" onClick={onClose}>
                        닫기
                    </ST.ChatBtn>
                    <ST.ChatBtn $textColor="#fff" $buttonColor="#00bd8f" onClick={createRoom}>
                        만들기
                    </ST.ChatBtn>
                </div>
            </ST.ChatInputDiv>
        </ST.StBackground>
    )
}

export default AddChatModal
