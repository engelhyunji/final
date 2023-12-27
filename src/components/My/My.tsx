import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getMyShop, getMyPet, deleteShop, ChatRoom, getMyChatRoom } from '../../apis/api/api'
import * as ST from './style'
import { IoLogoWechat } from 'react-icons/io5'
import { FaUserCircle } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import instance from '../../apis/instance'
import { useAuth } from '../../context/AuthContext'
import BackWave from '../BackWave'
import { AxiosError } from 'axios'
import { deleteChat } from '../../apis/api/chat'
import { ApiResponse, deletePet } from '../../apis/api/petmodify'

const My: React.FC = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const nickname = localStorage.getItem('nickname')
    const [shops, setShops] = useState<Shop[]>([])
    const [pets, setPets] = useState<Pet[]>([])
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])

    useEffect(() => {
        getMyShop()
            .then((shopData) => {
                if (shopData) {
                    setShops(shopData)
                    console.log('shopData 확인', shopData)
                } else {
                    console.log('가게 없음')
                }
            })
            .catch((error) => console.error('shop 정보 불러오기 오류:', error))

        getMyPet()
            .then((petData) => {
                if (petData) {
                    setPets(petData)
                    console.log('petData 확인', petData)
                } else {
                    console.log('펫 없음')
                }
            })
            .catch((error) => console.error('pet 정보 불러오기 오류:', error))

        getMyChatRoom()
            .then((roomData) => {
                if (roomData) {
                    setChatRooms(roomData)
                    console.log('roomData 확인', roomData)
                } else {
                    console.log('룸 없음')
                }
            })
            .catch((error) => console.error('chatRoom 정보 불러오기 오류:', error))
    }, [])

    const mutation = useMutation<void, AxiosError, number>(deleteShop, {
        onSuccess: () => {
            getMyShop()
                .then((shopData) => {
                    if (shopData) {
                        setShops(shopData)
                    }
                })
                .catch((error) => console.error('shop 삭제 에러', error))
        },
    })
    const petDeletemutation = useMutation<ApiResponse<null>, AxiosError, number>(deletePet, {
        onSuccess: () => {
            getMyPet()
                .then((petData) => {
                    if (petData) {
                        setPets(petData)
                        console.log('petData 확인', petData)
                    } else {
                        console.log('펫 없음')
                    }
                })
                .catch((error) => console.error('pet 정보 불러오기 오류:', error))
        },
    })

    const deleteChatMutation = useMutation<void, AxiosError, { roomId: string }>(({ roomId }) => deleteChat(roomId), {
        onSuccess: () => {
            getMyChatRoom()
                .then((roomData) => {
                    if (roomData) {
                        setChatRooms(roomData)
                        console.log('roomData 확인', roomData)
                    } else {
                        console.log('룸 없음')
                    }
                })
                .catch((error) => console.error('chatRoom 정보 불러오기 오류:', error))
        },
    })

    const DeleteHandler = (target: string, idx: number) => {
        if (target === 'shop') {
            if (confirm(`${shops[idx].shopName} Shop을 삭제하시겠습니까?`)) {
                mutation.mutate(shops[idx].shopId)
                setShops([])
            }
        } else if (target === 'pet') {
            if (confirm(`${pets[idx].petName} Pet을 삭제하시겠습니까?`)) {
                petDeletemutation.mutate(pets[idx].petId)
                setPets([])
            }
        } else if (target === 'chat') {
            if (confirm(`${chatRooms[idx].name} 채팅방을 삭제하시겠습니까?`)) {
                deleteChatMutation.mutate({ roomId: chatRooms[idx].roomId })
                setChatRooms([])
            }
        }
    }

    const enterRoom = (roomId: string): void => {
        if (confirm('채팅방에 입장하시겠습니까?')) {
            navigate(`/chat/room/enter/${roomId}`)
        }
    }

    const LeaveUserHandler = async () => {
        if (confirm('정말로 탈퇴하실건가요?😿')) {
            const password = prompt('비밀번호를 입력하시면 회원탈퇴가 완료됩니다🙊')
            if (password) {
                try {
                    await instance.delete('/api/user/delete', { data: { password } })
                    logout()
                } catch (err) {
                    console.log(err)
                    alert('탈퇴실패 비밀번호가 틀렸습니다')
                }
            }
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.MyContainer>
                <ST.TitleH2>
                    <FaUserCircle /> {nickname} 님의 마이 페이지
                </ST.TitleH2>

                {shops.length > 0 && (
                    <ST.ShopNPetSection>
                        <ST.TitleH3>마이 SHOP</ST.TitleH3>
                        <ST.MyUl>
                            {shops.map((shop) => (
                                <li key={shop.shopId}>
                                    <ST.MyDiv onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                        <ST.MyShopImg src={shop.imageUrls[0]} alt={shop.shopName} />
                                        <ST.ImgInfo>
                                            <ST.TitleH4>{shop.shopName}</ST.TitleH4>
                                            <p>업종: {shop.shopType}</p>
                                            <p>영업시간: {shop.shopTime}</p>
                                            <p>전화번호: {shop.shopTel}</p>
                                            <p>위치: {shop.shopAddress}</p>
                                            <p>소개: {shop.shopDescribe}</p>
                                        </ST.ImgInfo>
                                    </ST.MyDiv>
                                    <ST.BtnContainer>
                                        <ST.MyBtn onClick={() => navigate(`/shops/modify/${shop.shopId}`)}>
                                            수정
                                        </ST.MyBtn>
                                        <ST.ChatDelBtn onClick={() => DeleteHandler('shop', shops.indexOf(shop))}>
                                            삭제
                                        </ST.ChatDelBtn>
                                    </ST.BtnContainer>
                                </li>
                            ))}
                        </ST.MyUl>
                    </ST.ShopNPetSection>
                )}

                {pets.length > 0 && (
                    <ST.ShopNPetSection>
                        <ST.TitleH3>마이 PET</ST.TitleH3>
                        <ST.MyUl>
                            {pets.map((pet) => (
                                <li key={pet.petId}>
                                    <ST.MyDiv onClick={() => navigate(`/pet/${pet.petId}`)}>
                                        <ST.MyShopImg src={pet.imageUrls[0]} alt={pet.petName} />
                                        <ST.ImgInfo>
                                            <ST.TitleH4>{pet.petName}</ST.TitleH4>
                                            <p>종류: {pet.petKind}</p>
                                            <p>특이사항: {pet.petInfo}</p>
                                        </ST.ImgInfo>
                                    </ST.MyDiv>
                                    <ST.BtnContainer>
                                        <ST.MyBtn onClick={() => navigate(`/modify/${pet.petId}`)}>수정</ST.MyBtn>
                                        <ST.ChatDelBtn onClick={() => DeleteHandler('pet', pets.indexOf(pet))}>
                                            삭제
                                        </ST.ChatDelBtn>
                                    </ST.BtnContainer>
                                </li>
                            ))}
                        </ST.MyUl>
                    </ST.ShopNPetSection>
                )}

                {chatRooms.length > 0 && (
                    <ST.ShopNPetSection>
                        <ST.TitleH3>마이 CHAT</ST.TitleH3>
                        <ST.MyUl>
                            {chatRooms.map((chatroom) => (
                                <li key={chatroom.roomId}>
                                    <ST.MyChatDiv onClick={() => enterRoom(chatroom.roomId)}>
                                        {/* <p>방 ID: {chatroom.roomId}</p> */}
                                        <p>
                                            <IoLogoWechat /> <span>[ {chatroom.name} ]</span> 채팅방
                                        </p>
                                    </ST.MyChatDiv>
                                    <ST.BtnContainer>
                                        <ST.ChatDelBtn
                                            onClick={() => DeleteHandler('chat', chatRooms.indexOf(chatroom))}
                                        >
                                            삭제
                                        </ST.ChatDelBtn>
                                    </ST.BtnContainer>
                                </li>
                            ))}
                        </ST.MyUl>
                    </ST.ShopNPetSection>
                )}

                {shops.length === 0 && pets.length === 0 && (
                    <ST.ShopNPetSection>
                        등록된 SHOP 또는 PET 정보가 없습니다.
                        <br /> 내 가게 또는 반려동물을 등록해보세요!
                        <ST.BtnContainer>
                            <ST.MyBtn
                                onClick={() => {
                                    navigate('/shops')
                                }}
                            >
                                Shop
                            </ST.MyBtn>
                            <ST.MyBtn
                                onClick={() => {
                                    navigate('/pet')
                                }}
                            >
                                Pet
                            </ST.MyBtn>
                        </ST.BtnContainer>
                    </ST.ShopNPetSection>
                )}

                <ST.LeaveSpan onClick={LeaveUserHandler}>회원탈퇴</ST.LeaveSpan>
            </ST.MyContainer>
        </ST.Container>
    )
}

export default My
