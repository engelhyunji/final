import React, { useState, useEffect, useRef } from 'react'
import * as ST from './style'
import * as Stomp from '@stomp/stompjs'
// import SockJS from 'sockjs-client/dist/sockjs'
// import SockJS from 'sockjs-client'
import { useNavigate, useParams } from 'react-router-dom'
import { getChatMessages, getChatRoom } from '../../../apis/api/chat'
import { Creator } from '../ChatList'

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
    sentAt: string
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
        return disconnect
    }, [])

    // 웹소켓 연결 후 하트비트 전송 설정
    useEffect(() => {
        const heartbeatInterval = setInterval(sendHeartbeat, 5000) // 5초마다 전송
        return () => clearInterval(heartbeatInterval) // 컴포넌트 언마운트 시 인터벌 정지
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
            sentAt: new Date().toISOString(),
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

    // 하트비트 메시지 전송 함수
    const sendHeartbeat = () => {
        if (!client.current.connected) return
        const heartbeatMessage = {
            type: 'HEARTBEAT',
            email: email,
        }
        client.current.publish({
            destination: '/chat/heartbeat',
            body: JSON.stringify(heartbeatMessage),
            headers: headers,
        })
    }

    // 시간 형식 00:00 AM/PM
    const formatDateToAMPM = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }

        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', options)
    }

    const formattedDate = formatDateToAMPM(new Date().toISOString())

    const connectWebSocket = () => {
        client.current = new Stomp.Client({
            brokerURL: import.meta.env.VITE_APP_SERVER_WS_URL,
            onConnect: () => {
                console.log('connect 성공')
                subscribe()
                const enterMessage = {
                    type: 'ENTER',
                    email,
                    roomId,
                    sender: nickname,
                    sentAt: formattedDate,
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
            debug() {
                // 관련 정보(헤더토큰) 안보이게
                // console.log(str)
            },
            reconnectDelay: 5000, // 자동 재 연결 5초마다
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
        })
        client.current.activate()
        setWclient(client.current)
    }

    const publish = (message: string) => {
        if (!client.current.connected) return

        if (message.length > 300) {
            alert('메시지는 300자 이내로 입력해 주세요.')
            return
        }

        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify({ type: 'TALK', roomId, sender: nickname, message, sentAt: formattedDate }),
            headers: headers,
        })

        setMessage('')
    }

    return (
        <ST.ChatRContainer>
            <ST.MessageLeftDiv>
                <ST.ChatMemberContainer>
                    <ST.ChatMemberP>
                        대화상대 <ST.ChatMemberSpan>{room?.members.length}명</ST.ChatMemberSpan>
                    </ST.ChatMemberP>
                    <ST.ChatMemberWrap>
                        {members?.map((member) => (
                            <ST.ChatMemberDiv key={member.email}>
                                {member.nickname}
                                {member.nickname === room?.creator.nickname ? '👑' : ''}
                                {member.pets?.map((pet) => (
                                    <ST.ChatPetDiv key={pet.petId}>
                                        <ST.ChatPetImg src={pet.imageUrls[0]} alt={pet.petName} />
                                        <ST.ChatPetInfoDiv>
                                            <span>{pet.petName}</span>
                                            <p>{pet.petInfo}</p>
                                        </ST.ChatPetInfoDiv>
                                    </ST.ChatPetDiv>
                                ))}
                            </ST.ChatMemberDiv>
                        ))}
                    </ST.ChatMemberWrap>
                </ST.ChatMemberContainer>

                <ST.LeaveDiv>
                    <ST.ChatLeaveBtn onClick={disconnect}>채팅방 나가기</ST.ChatLeaveBtn>
                </ST.LeaveDiv>
            </ST.MessageLeftDiv>

            <ST.MessageRightDiv>
                <ST.ChatH2>{room?.name}</ST.ChatH2>

                <ST.MessageUl ref={scrollRef}>
                    {messages
                        ?.filter((msg) => msg.message !== null) // null인 메시지 필터링
                        .map((msg, idx) => (
                            // 내 메세지, 받은 메세지 스타일 따로 지정
                            // 입장 및 퇴장 메세지 스타일도 분리
                            <ST.MessageLi
                                key={idx}
                                className={
                                    msg.type !== 'ENTER' && msg.type !== 'QUIT'
                                        ? msg.sender !== nickname
                                            ? 'otherChat'
                                            : 'myChat'
                                        : ''
                                }
                            >
                                <ST.MessageDiv
                                    className={
                                        msg.type !== 'ENTER' && msg.type !== 'QUIT'
                                            ? msg.sender !== nickname
                                                ? 'otherMsg'
                                                : 'myMsg'
                                            : 'enterNquit'
                                    }
                                >

                                    {msg.sender !== nickname && msg.type !== 'ENTER' && msg.type !== 'QUIT' && (
                                        <p>{msg.sender}</p>
                                    )}
                                    <span>{msg.message}</span>
                                    {/* {msg.type !== 'ENTER' && msg.type !== 'QUIT' && <ST.MessageTimeSpan>{msg.sentAt}</ST.MessageTimeSpan>} */}
                                </ST.MessageDiv>
                            </ST.MessageLi>
                        ))}
                </ST.MessageUl>

                <ST.MessageInputDiv>
                    <ST.MessageInput
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="메세지를 입력해주세요"
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                publish(message)
                            }
                        }}
                    />
                    {message.length > 300 ? (
                        <ST.MessageLimitRed>{message.length}/300</ST.MessageLimitRed>
                    ) : (
                        <ST.MessageLimit>{message.length}/300</ST.MessageLimit>
                    )}
                    <div>
                        <ST.MyBtn type="button" onClick={() => publish(message)}>
                            전송
                        </ST.MyBtn>
                    </div>
                </ST.MessageInputDiv>
            </ST.MessageRightDiv>
        </ST.ChatRContainer>
    )
}

export default ChatRoom
