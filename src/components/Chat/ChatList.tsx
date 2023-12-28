import React, { useState, useEffect, ChangeEvent } from 'react'
import * as ST from './style'
import { SiKakaotalk } from "react-icons/si";
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addChat, getChatList } from '../../apis/api/chat'
import { AxiosError } from 'axios'

interface Chatroom {
    roomId: string
    name: string
    creator: Creator
    lastTalkMessage: LastTalkMessage
}
export interface Creator {
    email: string
    nickname: string
}
interface LastTalkMessage {
    sender: string
    message: string
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
            // console.log('채팅방 목록 조회 성공 data : ', data)
            console.log('채팅방 목록 조회 성공')
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

    // const deleteChatMutation = useMutation<void, AxiosError, { roomId: string }>(({ roomId }) => deleteChat(roomId), {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries('getChatList')
    //     },
    // })

    const createRoom = (): void => {
        if (roomName === '') {
            alert('방 제목을 입력해 주세요.')
            return
        } else if(roomName.length > 12) {
            alert('방 제목은 12자 이내로 입력해 주세요.')
            return
        } else {
            const params = new URLSearchParams()
            params.append('name', roomName)
            addChatMutation.mutate({ name: roomName })
        }
    }

    // const DeleteHandler = (roomId: string) => {
    //     if (confirm('채팅방을 삭제하시겠습니까?')) {
    //         deleteChatMutation.mutate({ roomId })
    //     }
    // }

    const enterRoom = (roomId: string): void => {
        if (confirm('채팅방에 입장하시겠습니까?')) {
            navigate(`/chat/room/enter/${roomId}`)
        }
    }

    return (
        <ST.ChatContainer>
            <ST.ChatListTitleWrap>
                <ST.ChatH2>채팅방 만들기 (개인이 생성할 수 있는 채팅방은 최대 2개입니다)</ST.ChatH2>
            </ST.ChatListTitleWrap>

            <ST.ChatInputDiv>
                <div>
                    {/* <ST.ChatLabel>채팅방 이름: </ST.ChatLabel> */}
                </div>
                <ST.ChatNameInput
                    placeholder="채팅방 이름(최대 12자)"
                    type="text"
                    value={roomName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRoomName(e.target.value)}
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
                        <ST.ChatListContainer key={item.roomId}>
                            <ST.ChatList onClick={() => enterRoom(item.roomId)}>
                                <ST.ChatListIcon><SiKakaotalk style={{width: '50px', height: '50px'}}/></ST.ChatListIcon>
                                <ST.ChatListInfo>
                                <p>{item.name}</p>
                                <p>👑 : {item.creator.nickname}</p>
                                <p>💌 - {item.lastTalkMessage?.message}</p>
                                </ST.ChatListInfo>
                            </ST.ChatList>
                            {/* <ST.ChatDelBtn onClick={() => DeleteHandler(item.roomId)}>삭제</ST.ChatDelBtn> */}
                        </ST.ChatListContainer>
                    ))
                )}
            </ST.ChatLists>
        </ST.ChatContainer>
    )
}

export default ChatList
