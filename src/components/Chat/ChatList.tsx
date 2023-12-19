import React, { useEffect, useState } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { addChat, deleteChat } from '../../apis/api/Chat'

interface ChatListData {
    roomId: string
    name: string
    userCount: number
}

const ChatList: React.FC = () => {
    const [chatName, setChatName] = useState<ChatListData["name"]>('')
    const [chatList, setChatList] = useState<ChatListData[]>([])

    const navigate = useNavigate()
    const enterChat = (roomId:ChatListData["roomId"]) => {
        navigate(`/chat/${roomId}`)
    }

    const myChatttingList = async () => {
        try {
            const res = await instance.get('/chat/rooms')
            return res.data.data.chatRoomResponseDtos
        } catch (err) {
            console.log(err)
        }
    }

    useQuery('getChatList', myChatttingList, {
        onSuccess: (data) => {
            if (data) {
                setChatList(data)
                // console.error('data 있으면 chatList', chatList)
            } else {
                // 반환된 데이터가 배열이 아니거나 null/undefined
                console.error('data 받기 실패 시 data', data)
            }
        },
        onError: (error) => {
            console.error('getChatList 에러 :', error)
        },
    })

    useEffect(() => {
        console.log('렌더링 시 chatList', chatList)
    }, [chatList])

    const queryClient = useQueryClient();
    const addMutation = useMutation<void, AxiosError, { chatName: string }>(
        ({ chatName }) => addChat(chatName),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('getChatList')
                setChatName('')
            },
            onError: (error) => {
                console.error('채팅방추가 Mutation 에러 :', error)
                alert('채팅 생성에 실패했습니다.')
            },
        },
    )

    const deleteMutation = useMutation<void, AxiosError, { roomId: string }>(
        ({ roomId }) => deleteChat(roomId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('getChatList')
            },
        },
    )

    const addChatHandler = async () => {
        addMutation.mutate({ chatName })
    }

    if (chatList?.length === 0) {
        return (
            <ST.EmptyWrap>
                <ST.EmptyText>진행 중인 채팅이 없습니다.</ST.EmptyText>
            </ST.EmptyWrap>
        )
    }

    return (
        <ST.ChatContainer>
            <div>
                <ST.ChatH2>채팅방 만들기</ST.ChatH2>
                <ST.ChatLabel>채팅방 이름: </ST.ChatLabel>
                <ST.ChatNameInput value={chatName} onChange={(e) => setChatName(e.target.value)}/>
                <ST.ChatBtn onClick={addChatHandler}>채팅방 생성</ST.ChatBtn>
            </div>
            <div>
                <ST.ChatH2>채팅</ST.ChatH2>
                <ST.ChatLists>
                    {chatList.map((item, index) => {
                        return (
                            <ST.ChatList key={index} onClick={() => enterChat(item.roomId)}>
                                <div>
                                    roomId: {item.roomId}
                                    <div>
                                        <p>
                                            방제목: {item.name}
                                            {/* 제목 */}
                                        </p>
                                        <p>참여자수: {item.userCount}</p>
                                        <ST.ChatBtn onClick={() => deleteMutation.mutate({ roomId: item.roomId })}>방 삭제하기</ST.ChatBtn>
                                    </div>
                                </div>
                            </ST.ChatList>
                        )
                    })}
                </ST.ChatLists>
            </div>
        </ST.ChatContainer>
    )
}

export default ChatList
