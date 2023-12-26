import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getMyShop, getMyPet, deleteShop, ChatRoom, getMyChatRoom } from '../../apis/api/api'
import * as ST from './style'
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import instance from '../../apis/instance'
import { useAuth } from '../../context/AuthContext'
import BackWave from '../BackWave'

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

    const mutation = useMutation(deleteShop, {
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

    const DeleteHandler = (target: string, idx: number) => {
        if (target === 'shop') {
            if (confirm(`${shops[idx].shopName} Shop을 삭제하시겠습니까?`)) {
                mutation.mutate(shops[idx].shopId)
                setShops([])
            }
        } else if (target === 'pet') {
            if (confirm(`${pets[idx].petName} Pet을 삭제하시겠습니까?`)) {
                mutation.mutate(pets[idx].petId)
                setPets([])
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
                <ST.TitleH2>{nickname}님의 마이 페이지</ST.TitleH2>

                {shops.length > 0 && (
                    <ST.ShopNPetSection>
                        <ST.TitleH3>마이 SHOP</ST.TitleH3>
                        <ST.MyUl>
                            {shops.map((shop) => (
                                <li key={shop.shopId}>
                                    <ST.MyDiv onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                        <ST.MyShopImg src={shop.imageUrls[0]} alt={shop.shopName} />
                                        <p>가게 이름: {shop.shopName}</p>
                                        <p>가게 시간: {shop.shopTime}</p>
                                        <p>연락처: {shop.shopTel}</p>
                                        <p>주소: {shop.shopAddress}</p>
                                        <p>유형: {shop.shopType}</p>
                                        <p>소개: {shop.shopDescribe}</p>
                                    </ST.MyDiv>
                                    <ST.BtnContainer>
                                        <ST.MyBtn onClick={() => navigate(`/shops/modify/${shop.shopId}`)}>
                                            수정
                                        </ST.MyBtn>
                                        <ST.MyBtn onClick={() => DeleteHandler('shop', shops.indexOf(shop))}>
                                            삭제
                                        </ST.MyBtn>
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
                                        <p>반려동물 이름: {pet.petName}</p>
                                        <p>반려동물 종류: {pet.petKind}</p>
                                        <p>반려동물 특이사항: {pet.petInfo}</p>
                                    </ST.MyDiv>
                                    <ST.BtnContainer>
                                        <ST.MyBtn onClick={() => navigate(`/modify/${pet.petId}`)}>수정</ST.MyBtn>
                                        <ST.MyBtn onClick={() => DeleteHandler('pet', pets.indexOf(pet))}>
                                            삭제
                                        </ST.MyBtn>
                                    </ST.BtnContainer>
                                </li>
                            ))}
                        </ST.MyUl>
                    </ST.ShopNPetSection>
                )}

                {chatRooms.length > 0 && (
                    <ST.ShopNPetSection>
                        <ST.TitleH3>마이 채팅방</ST.TitleH3>
                        <ST.MyUl>
                            {chatRooms.map((chatroom) => (
                                <ST.MyDiv key={chatroom.roomId} onClick={() => enterRoom(chatroom.roomId)}>
                                    <p>방 ID: {chatroom.roomId}</p>
                                    <p>방 이름: {chatroom.name}</p>
                                    <p>개설자: {chatroom.creator.nickname}</p>
                                </ST.MyDiv>
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
