import React, { useState, useEffect, useRef } from 'react'
import * as ST from './style'
import * as Stomp from '@stomp/stompjs'
// import SockJS from 'sockjs-client/dist/sockjs'
// import SockJS from 'sockjs-client'
import { useNavigate, useParams } from 'react-router-dom'
import { getChatMessages, getChatRoom } from '../../apis/api/chat'
import { Creator } from './ChatList'

interface ChatroomDetail {
    roomId: string
    name: string
    creator: Creator
    members: member[]
}
interface member {
    email: string
    nickname: string
    pets: pet[]
}
interface pet {
    petName: string
    petId: number
    petKind: string
    petGender: string
    petInfo: string
    imageUrls: string[]
}

interface Message {
    type: string
    sender: string
    message: string
}

const ChatRoom: React.FC = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('accessToken')
    const nickname = localStorage.getItem('nickname')
    const email = localStorage.getItem('email')
    const { roomId } = useParams()
    const [room, setRoom] = useState<ChatroomDetail | null>(null)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
    const [members, setMembers] = useState<member[]>([])

    const [wclient, setWclient] = useState<any | null>(null)
    const scrollRef = useRef<any>()

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        connectWebSocket()
        getChatRoom(roomId as string).then((data) => {
            setRoom(data)
            setMembers(data.members)
        })
        getChatMessages(roomId as string).then((data) => setMessages(data))
        return () => disconnect()
    }, [])

    useEffect(() => {
        getChatRoom(roomId as string).then((data) => {
            setMembers(data.members)
        })
    }, [room])

    const client = useRef<any>()
    const headers = {
        Authorization: token || '', // 토큰이 없으면 빈 문자열로
    }

    const disconnect = () => {
        if (!wclient) return

        const quitMessage = {
            type: 'QUIT',
            roomId,
            sender: nickname,
        }

        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(quitMessage),
            headers: {
                Authorization: token || '',
                roomId: roomId || '',
            },
        })

        client.current.deactivate(() => {
            console.log('Disconnected')
        })
        navigate('/chat/room')
    }

    const subscribe = () => {
        client.current.subscribe(
            `/sub/chat/room/${roomId}`,
            (message: any) => {
                console.log('connect !')
                if (message.body) {
                    const msg = JSON.parse(message.body)
                    setMessages((prevMessages) => [...prevMessages, msg])
                }
            },
            headers,
        )
    }

    const connectWebSocket = () => {
        client.current = new Stomp.Client({
            brokerURL: import.meta.env.VITE_APP_SERVER_WS_URL,
            onConnect: () => {
                console.log('success')
                subscribe()
                const enterMessage = {
                    type: 'ENTER',
                    email,
                    roomId,
                    sender: nickname,
                }

                client.current.publish({
                    destination: '/pub/chat/message',
                    body: JSON.stringify(enterMessage),
                    headers: {
                        Authorization: token || '',
                        roomId: roomId || '',
                    },
                })
            },
            connectHeaders: headers,
            debug: function (str) {
                console.log(str)
            },
            reconnectDelay: 5000, // 자동 재 연결
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        })
        client.current.activate()
        setWclient(client.current)
    }

    const publish = (message: string) => {
        if (!client.current.connected) return

        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({ type: 'TALK', roomId, sender: nickname, message }),
            headers: headers,
        })

        setMessage('')
    }

    return (
        <ST.ChatContainer>
            <ST.MessageContainer>
                <ST.MessageInfoContainer>
                    <ST.ChatH2>{room?.name} 채팅방</ST.ChatH2>
                    {/* <span>방ID: {room?.roomId}</span> */}
                    <span>방장👑: {room?.creator.nickname}</span>
                    <span>참여자 수: {room?.members.length}</span>
                    <span>참여인원: {room?.members.map((member) => member.nickname)}</span>
                    <div>
                        <ST.ChatLeaveBtn onClick={disconnect}>채팅방 나가기</ST.ChatLeaveBtn>
                    </div>
                </ST.MessageInfoContainer>

                <ST.MessageListContainer>
                    <ST.MessageUl ref={scrollRef}>
                        {messages?.map((msg, idx) => (
                            // 내 메세지, 받은 메세지 스타일 따로 지정
                            <ST.MessageLi key={idx} className={msg.sender !== nickname ? 'otherChat' : 'myChat'}>
                                <ST.MessageDiv
                                    className={
                                        msg.type !== 'ENTER' && msg.type !== 'QUIT'
                                            ? msg.sender !== nickname
                                                ? 'otherMsg'
                                                : 'myMsg'
                                            : 'enterNquit'
                                    }
                                >
                                    {msg.sender !== nickname && msg.type !== 'ENTER' && <p>{msg.sender}</p>}
                                    <span>{msg.message}</span>
                                </ST.MessageDiv>
                            </ST.MessageLi>
                        ))}
                    </ST.MessageUl>

                    <ST.ChatMemberContainer>
                        <ST.ChatH3>대화상대</ST.ChatH3>
                        {members?.map((member) => (
                            <ST.ChatMemberDiv key={member.email}>
                                {member.nickname}
                                {member.nickname === room?.creator.nickname ? '👑' : ''}
                                {member.pets?.map((pet) => (
                                    <ST.ChatPetDiv key={pet.petId}>
                                        <ST.ChatPetImg src={pet.imageUrls[0]} alt={pet.petName} />
                                        <ST.ChatPetInfoDiv>
                                            <span>{pet.petName}</span>
                                            <span>{pet.petInfo}</span>
                                        </ST.ChatPetInfoDiv>
                                    </ST.ChatPetDiv>
                                ))}
                            </ST.ChatMemberDiv>
                        ))}
                    </ST.ChatMemberContainer>
                </ST.MessageListContainer>
            </ST.MessageContainer>

            <ST.MessageInputDiv>
                <div>
                    <label>💌</label>
                </div>
                <ST.MessageInput
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            publish(message)
                        }
                    }}
                />
                <div>
                    <ST.MyBtn type="button" onClick={() => publish(message)}>
                        보내기
                    </ST.MyBtn>
                </div>
            </ST.MessageInputDiv>
        </ST.ChatContainer>
    )
}

export default ChatRoom
