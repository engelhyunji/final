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
    pets?: Pet[]
}
interface Pet {
    imageUrls: string[]
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
            <ModalPortal>{modalOn && <AddChatModal onClose={handleModal} />}</ModalPortal>

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
                                <ST.ChatListInfoP $width="16%">
                                    <ST.InfoRoomName>{item.name}</ST.InfoRoomName>
                                </ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="32%">{item.lastTalkMessage?.message}</ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="28%">
                                    {item.tags?.map((tag) => (
                                        <ST.InfoTagWords key={tag.name}>{tag.name && `#${tag.name}`}</ST.InfoTagWords>
                                    ))}
                                </ST.ChatListInfoP>
                                <ST.ChatListInfoP $width="8%">
                                    방장
                                    <ST.ChatListInfoImg
                                        $ImgUrl={item.creator.pets && item.creator.pets[0]?.imageUrls[0]}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                        style={{transform: "translate(-16px, 12px)"}}
                                    >
                                        <path
                                            d="M10.4752 1.74609C5.648 1.74609 1.74609 5.67419 1.74609 10.4752C1.74609 15.2762 5.67419 19.2043 10.4752 19.2043C15.2762 19.2043 19.2043 15.2762 19.2043 10.4752C19.2043 5.67419 15.2762 1.74609 10.4752 1.74609ZM13.9668 13.478C13.9668 13.7748 13.7748 13.9668 13.478 13.9668H7.47238C7.17559 13.9668 6.98355 13.7748 6.98355 13.478V13.0939H13.9668V13.478ZM13.9668 12.221H6.98355L6.11064 6.98355L8.72937 8.72937L10.4752 6.11064L12.221 8.72937L14.8397 6.98355L13.9668 12.221Z"
                                            fill="#00BD8F"
                                        />
                                    </svg>
                                    {/* {item.creator.nickname} */}
                                </ST.ChatListInfoP>
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
