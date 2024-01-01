import React, { useState, useEffect, ChangeEvent } from 'react'
import * as ST from './style'
import { SiKakaotalk } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addChat, getChatList } from '../../apis/api/chat'
import { getHashRoomList, getPopularHash } from '../../apis/api/tag'
import { AxiosError } from 'axios'

interface Hash {
    name: string
}
export interface Chatroom {
    roomId: string
    name: string
    creator: Creator
    lastTalkMessage: LastTalkMessage
    tags: Tag[]
}
export interface Creator {
    email: string
    nickname: string
}
interface LastTalkMessage {
    sender: string
    message: string
}
interface Tag {
    name: string
}

const ChatList: React.FC = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [popularHash, setPopularHash] = useState<Hash[]>([])
    const [roomName, setRoomName] = useState<string>('')
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
    const [allChatrooms, setAllChatrooms] = useState<Chatroom[]>([])

    const { data, isSuccess } = useQuery('getChatList', getChatList)
    useEffect(() => {
        if (isSuccess && data) {
            setChatrooms(data)
            setAllChatrooms(data)
            // console.log('채팅방 목록 조회 성공 data : ', data)
            // console.log('채팅방 목록 조회 성공')
        }
    }, [isSuccess, data])
    useEffect(() => {
        getPopularHash().then((data) => setPopularHash(data))
    }, [])

    const addChatMutation = useMutation<void, AxiosError, { name: string }>(({ name }) => addChat({ name }), {
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

    // 해시태그 클릭
    const getTagRooms = async (tag: string): Promise<void> => {
        await getHashRoomList(tag).then((data) => setChatrooms(data))
    }
    // 다시 전체보기
    const getAllRooms = () => {
        setChatrooms(allChatrooms) // 전체보기를 누를 때 원래 목록으로 복원
    }

    return (
        <ST.ChatContainer>
            <ST.ChatListTitleWrap>
                <ST.ChatH2>채팅방 만들기 (개인이 생성할 수 있는 채팅방은 최대 2개입니다)</ST.ChatH2>
            </ST.ChatListTitleWrap>

            <ST.ChatInputDiv>
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

            {/* 해시태그 부분 */}
            <div>
                HOT 해시태그: &nbsp;
                {popularHash?.length === 0 ? (
                    '해시태그가 없습니다'
                ) : (
                    <>
                        <ST.TagWords onClick={getAllRooms}>전체보기 </ST.TagWords>|
                    </>
                )}
                {popularHash?.map((item) => (
                    <ST.TagWords key={item?.name} onClick={() => getTagRooms(item?.name)}>
                        {'  '}#{item?.name}{' '}
                    </ST.TagWords>
                ))}
            </div>

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
                                <ST.ChatListIcon>
                                    <SiKakaotalk style={{ width: '50px', height: '50px' }} />
                                </ST.ChatListIcon>
                                <ST.ChatListInfo>
                                    <p>{item.name}</p>
                                    <p>👑 : {item.creator.nickname}</p>
                                    <p>💌 - {item.lastTalkMessage?.message}</p>
                                    <p>
                                        {item.tags?.map((tag) => (
                                            <span key={tag.name}>{tag.name && `#${tag.name} `}</span>
                                        ))}
                                    </p>
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
