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
        getChatRoom(roomId as string).then((data) => setRoom(data))
        getChatMessages(roomId as string).then((data) => setMessages(data))
        return () => disconnect()
    }, [])
    

    const client = useRef<any>()
    const headers = {
        Authorization: token || '', // 토큰이 없으면 빈 문자열로 설정
    };

    const disconnect = () => {
        if (!wclient) return

        const quitMessage = {
            type: 'QUIT',
            roomId,
            sender: nickname,
        };
    
        client.current.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(quitMessage),
            headers: headers,
        });
    

        client.current.deactivate(() => {
            console.log('Disconnected')
        })
        navigate('/chat/room')
    }

    const subscribe = () => {
        client.current.subscribe(`/sub/chat/room/${roomId}`, (message: any) => {
            console.log('connect !')
            if (message.body) {
                const msg = JSON.parse(message.body)
                setMessages((prevMessages) => [...prevMessages, msg])
            }
        })
    }

    const connectWebSocket = () => {
        client.current = new Stomp.Client({
            brokerURL: 'ws://52.78.115.3:8080/ws',
            // brokerURL: 'ws://52.79.74.205:8080/ws',
            // brokerURL: 'ws://54.180.94.139:8080/ws',
            // brokerURL: 'ws://15.164.219.13/ws-stomp',
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
                    headers: headers,
                })
            },
            connectHeaders: {
                Authorization: token || '',
            },
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
        <ST.ChatContainer id="app">
            <ST.MessageContainer>
                <ST.MessageInfoContainer>
                    <ST.ChatH2>{room?.name} 채팅방</ST.ChatH2>
                    {/* <span>방ID: {room?.roomId}</span> */}
                    <span>개설자: {room?.creator.nickname}</span>
                    {/* <span>참여자수: {room?.members.length}</span>
                    <span>참여자: {room?.members.map((member) => member.nickname)}</span> */}
                    <div>
                        <button onClick={disconnect}>채팅방 나가기</button>
                    </div>
                </ST.MessageInfoContainer>
                <ST.MessageListContainer ref={scrollRef}> 
                <ul>
                    {messages?.map((msg, index) => (
                        <li key={index}>
                            {msg.sender} - {msg.message}
                        </li>
                    ))}
                </ul>
                </ST.MessageListContainer>
            </ST.MessageContainer>

            <ST.MessageInputDiv>
                <div>
                    <label>내용</label>
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            publish(message);
                        }
                    }}
                />
                <div>
                    <ST.ChatBtn type="button" onClick={() => publish(message)}>
                        보내기
                    </ST.ChatBtn>
                </div>
            </ST.MessageInputDiv>
        </ST.ChatContainer>
    )
}

export default ChatRoom
