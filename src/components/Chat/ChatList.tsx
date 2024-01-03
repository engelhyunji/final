import React, { useState, useEffect } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getChatList } from '../../apis/api/chat'
import { getHashRoomList, getPopularHash } from '../../apis/api/tag'
import ModalPortal from '../modal/ModalPortal'
import AddChatModal from '../modal/AddChatModal'

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

    const [modalOn, setModalOn] = useState(false)

    const [popularHash, setPopularHash] = useState<Tag[]>([])
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

    const handleModal = () => {
        setModalOn(!modalOn)
    }

    

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
                <ST.ChatH2>채팅 목록</ST.ChatH2>
                <ST.AddChatBtn onClick={handleModal}>+ 새로운 채팅방 만들기</ST.AddChatBtn>
            </ST.ChatListTitleWrap>

            {/* 채팅방 생성 모달창 */}
            <ModalPortal>
                {modalOn && <AddChatModal onClose={handleModal} />}
            </ModalPortal>

            {/* 해시태그 부분 */}
            <ST.ChatHashDiv>
                <ST.ChatH3>실시간 인기 해시태그</ST.ChatH3>
                <ST.TagDiv>
                    {popularHash?.length === 0 ? (
                        '해시태그가 없습니다'
                    ) : (
                        <>
                            <ST.TagWords onClick={getAllRooms}>전체</ST.TagWords>
                        </>
                    )}
                    {popularHash?.map((item) => (
                        <ST.TagWords key={item?.name} onClick={() => getTagRooms(item?.name)}>
                            #{item?.name}
                        </ST.TagWords>
                    ))}
                </ST.TagDiv>
            </ST.ChatHashDiv>

            <ST.ChatH3>실시간 채팅</ST.ChatH3>

            <ST.ChatLists>
                {chatrooms.length === 0 ? (
                    <ST.EmptyWrap>
                        <ST.EmptyText>진행 중인 채팅이 없습니다.</ST.EmptyText>
                    </ST.EmptyWrap>
                ) : (
                    chatrooms.map((item) => (
                        <ST.ChatList key={item.roomId}>
                            <ST.ChatListInfo>
                                <ST.ChatListInfoP $width="16%">{item.name}</ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="32%">{item.lastTalkMessage?.message}</ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="28%">
                                    {item.tags?.map((tag) => <ST.InfoTagWords key={tag.name}>{tag.name && `#${tag.name}`}</ST.InfoTagWords>)}
                                </ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="8%">방장 {item.creator.nickname}</ST.ChatListInfoP>
                                <ST.InBtn onClick={() => enterRoom(item.roomId)}>채팅 참여하기</ST.InBtn>
                            </ST.ChatListInfo>
                        </ST.ChatList>
                    ))
                )}
            </ST.ChatLists>
        </ST.ChatContainer>
    )
}

export default ChatList
