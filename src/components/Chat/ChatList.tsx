import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addChat, deleteChat, getChatList } from '../../apis/api/chat'
import { AxiosError } from 'axios'

interface Chatroom {
    roomId: string
    name: string
    creator: Creator
}
export interface Creator {
    email: string
    nickname: string
}

const ChatList: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [roomName, setRoomName] = useState<string>('')
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])

    const { data, isSuccess } = useQuery('getChatList', getChatList)
    useEffect(() => {
        if (isSuccess && data) {
            setChatrooms(data)
            console.log('채팅방 목록 조회 성공 data : ', data)
        }
    }, [isSuccess, data])

    const addChatMutation = useMutation<void, AxiosError, { name: string }>(({ name }) => addChat({name}), {
        onSuccess: () => {
            setRoomName('')
            queryClient.invalidateQueries('getChatList')
        },
        onError: () => {
            alert('채팅방 생성에 실패했습니다.')
        },
    })

    const deleteChatMutation = useMutation<void, AxiosError, { roomId: string }>(({ roomId }) => deleteChat(roomId), {
        onSuccess: () => {
            queryClient.invalidateQueries('getChatList')
        },
    })

    const createRoom = (): void => {
        if (roomName === '') {
            alert('방 제목을 입력해 주세요.')
            return
        } else {
            const params = new URLSearchParams()
            params.append('name', roomName)
            addChatMutation.mutate({ name: roomName })
        }
    }

    const DeleteHandler = (roomId: string) => {
        if (confirm('채팅방을 삭제하시겠습니까?')) {
            deleteChatMutation.mutate({ roomId })
        }
    }

    const enterRoom = (roomId: string): void => {
        if (confirm('채팅방에 입장하시겠습니까?')) {
            navigate(`/chat/room/enter/${roomId}`)
        }
    }

    return (
        <ST.ChatContainer id="app">
            <div>
                <ST.ChatH2>채팅방 만들기</ST.ChatH2>
            </div>

            <ST.ChatInputDiv>
                <div>
                    <ST.ChatLabel>채팅방 이름: </ST.ChatLabel>
                </div>
                <ST.ChatNameInput
                    type="text"
                    value={roomName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
                    onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && createRoom()}
                />
                <div>
                    <ST.ChatBtn type="button" onClick={createRoom}>
                        채팅방 개설
                    </ST.ChatBtn>
                </div>
            </ST.ChatInputDiv>
            <ST.ChatH2>채팅방 목록</ST.ChatH2>
            <ST.ChatLists>
                {chatrooms.length === 0 ? (
                    <ST.EmptyWrap>
                        <ST.EmptyText>진행 중인 채팅이 없습니다.</ST.EmptyText>
                    </ST.EmptyWrap>
                ) : (
                    chatrooms.map((item) => (
                        <div key={item.roomId}>
                            <ST.ChatList onClick={() => enterRoom(item.roomId)}>
                                {/* 방 ID: {item.roomId} <br /> */}
                                방 이름: {item.name} <br />
                                방장 : {item.creator.nickname}
                            </ST.ChatList>
                            <button onClick={() => DeleteHandler(item.roomId)}>삭제</button>
                        </div>
                    ))
                )}
            </ST.ChatLists>
        </ST.ChatContainer>
    )
}

export default ChatList
