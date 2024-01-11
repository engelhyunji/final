import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getMyShop, getMyPet, deleteShop, getMyChatRoom } from '../../apis/api/api'
import * as ST from './style'
import { IoLogoWechat } from 'react-icons/io5'
import { AiFillMinusCircle } from 'react-icons/ai'
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { deleteChat } from '../../apis/api/chat'
import { ApiResponse, deletePet } from '../../apis/api/petmodify'
import { Chatroom } from '../Chat/ChatList'
import { AddHash, deleteHash } from '../../apis/api/tag'
import Empty from './Empty'
import ModalPortal from '../modal/ModalPortal'
import LeaveUserModal from '../modal/LeaveUserModal'

const My: React.FC = () => {
    const navigate = useNavigate()
    const nickname = localStorage.getItem('nickname')

    const [myCategory, setMyCategory] = useState<string>('shop')
    // 현재 활성화된 카테고리(.active 스타일 설정용)
    const [nowCategory, setNowCategory] = useState<string>('shop')

    const [shops, setShops] = useState<Shop[]>([])
    const [pets, setPets] = useState<Pet[]>([])
    const [chatRooms, setChatRooms] = useState<Chatroom[]>([])

    const [modalOn, setModalOn] = useState(false)

    const handleModal = () => {
        setModalOn(!modalOn)
    }


    useEffect(() => {
        getMyShop()
            .then((shopData) => {
                if (shopData) {
                    setShops(shopData)
                    // console.log('shopData 확인', shopData)
                } else {
                    console.log('가게 없음')
                }
            })
            .catch((error) => console.error('shop 정보 불러오기 오류:', error))

        getMyPet()
            .then((petData) => {
                if (petData) {
                    setPets(petData)
                    // console.log('petData 확인', petData)
                } else {
                    console.log('펫 없음')
                }
            })
            .catch((error) => console.error('pet 정보 불러오기 오류:', error))

        getMyChatRoom()
            .then((roomData) => {
                if (roomData) {
                    setChatRooms(roomData)
                    // console.log('roomData 확인', roomData)
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
                        // console.log('petData 확인', petData)
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
                        // console.log('roomData 확인', roomData)
                    } else {
                        console.log('룸 없음')
                    }
                })
                .catch((error) => console.error('chatRoom 정보 불러오기 오류:', error))
        },
    })

    const MyCategoryHandler = (category: string) => {
        setMyCategory(category)
        setNowCategory(category)
    }

    const AddHandler = (target: string) => {
        if (target === 'shop') {
            if (confirm('가게를 추가하시겠습니까? (최대 5개 가능)')) {
                navigate('/shops')
            }
        } else if (target === 'pet') {
            if (confirm('반려동물를 추가하시겠습니까? (최대 10마리 가능)')) {
                navigate('/pet')
            }
        }
    }

    const DeleteHandler = (target: string, idx: number) => {
        if (target === 'shop') {
            if (confirm(`${shops[idx].shopName} 가게를 삭제하시겠습니까?`)) {
                mutation.mutate(shops[idx].shopId)
                setShops([])
            }
        } else if (target === 'pet') {
            if (confirm(`${pets[idx].petName} 반려동물을 삭제하시겠습니까?`)) {
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

    const AddTag = async (roomId: string) => {
        if (confirm('해시태그를 추가하시겠어요?')) {
            const hash = prompt('한 해시태그 당 최대 7자로 두 개까지 만들 수 있어요') as string
            if (hash.length > 7) {
                alert('해시태그는 7자 이내로 입력해 주세요.')
            } else {
                try {
                    await AddHash(roomId, hash)
                } catch (error) {
                    console.error('에러 발생:', error)
                } finally {
                    // 채팅방 목록 다시 불러오기
                    getMyChatRoom()
                        .then((roomData) => {
                            if (roomData) {
                                setChatRooms(roomData)
                            } else {
                                console.log('룸 없음')
                            }
                        })
                        .catch((error) => console.error('chatRoom 정보 불러오기 오류:', error))
                }
            }
        }
    }

    const DeleteTag = async (roomId: string, hash: string) => {
        if (confirm('해시태그를 삭제하시겠어요?')) {
            try {
                await deleteHash(roomId, hash)
            } catch (error) {
                console.error('에러 발생:', error)
            } finally {
                // 채팅방 목록을 다시 불러오기
                getMyChatRoom()
                    .then((roomData) => {
                        if (roomData) {
                            setChatRooms(roomData)
                        } else {
                            console.log('룸 없음')
                        }
                    })
                    .catch((error) => console.error('chatRoom 정보 불러오기 오류:', error))
            }
        }
    }

    return (
        <ST.MyContainer>
            <ST.TitleH2>
                {/* userCircle 아이콘 */}
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                        d="M32 20C32 22.1217 31.1571 24.1566 29.6569 25.6569C28.1566 27.1571 26.1217 28 24 28C21.8783 28 19.8434 27.1571 18.3431 25.6569C16.8429 24.1566 16 22.1217 16 20C16 17.8783 16.8429 15.8434 18.3431 14.3431C19.8434 12.8429 21.8783 12 24 12C26.1217 12 28.1566 12.8429 29.6569 14.3431C31.1571 15.8434 32 17.8783 32 20Z"
                        fill="black"
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24C44 35.046 35.046 44 24 44C23.9087 44.0006 23.8173 44.0006 23.726 44C23.545 44 23.364 43.994 23.184 43.984ZM11.166 36.62C11.0165 36.1906 10.9656 35.733 11.0171 35.2812C11.0686 34.8294 11.2212 34.395 11.4636 34.0103C11.706 33.6255 12.0319 33.3003 12.4171 33.0588C12.8024 32.8172 13.2371 32.6655 13.689 32.615C21.485 31.752 26.563 31.83 34.321 32.633C34.7735 32.6801 35.2093 32.8299 35.5952 33.0709C35.9811 33.3119 36.3068 33.6378 36.5477 34.0237C36.7886 34.4096 36.9383 34.8455 36.9853 35.298C37.0323 35.7505 36.9754 36.2078 36.819 36.635C40.1439 33.2709 42.006 28.7299 42 24C42 14.059 33.941 6 24 6C14.059 6 6 14.059 6 24C6 28.916 7.971 33.372 11.166 36.62Z"
                        fill="black"
                    />
                </svg>
                {nickname} 님의 마이 페이지
            </ST.TitleH2>

            {/* 등록된 가게 및 반려동물이 없을 때 */}
            {shops.length === 0 && pets.length === 0 && <Empty />}

                <ST.MyCategoryUl>
                    <ST.MyCategoryLi
                        onClick={() => MyCategoryHandler('shop')}
                        className={nowCategory === 'shop' ? 'active' : ''}
                    >
                        내 가게
                    </ST.MyCategoryLi>
                    <ST.MyCategoryLi
                        onClick={() => MyCategoryHandler('pet')}
                        className={nowCategory === 'pet' ? 'active' : ''}
                    >
                        내 반려동물
                    </ST.MyCategoryLi>
                </ST.MyCategoryUl>

            {myCategory === 'shop' && (
                <ST.ShopNPetSection>
                    <ST.MyUl>
                        {shops.map((shop) => (
                            <ST.MyLi key={shop.shopId}>
                                <ST.MyDiv onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                    <ST.MyShopImg src={shop.imageUrls[0]} alt={shop.shopName} />
                                    <ST.MyInfo>
                                        <ST.TitleH4>{shop.shopName}</ST.TitleH4>
                                        <ST.BodyTimeP>영업시간</ST.BodyTimeP>
                                        <ST.BodyTimeInfoP>
                                            {shop.shopStartTime}-{shop.shopEndTime}
                                        </ST.BodyTimeInfoP>
                                        <ST.BodyTelP>전화번호</ST.BodyTelP>
                                        <ST.BodyTelInfoP>
                                            {shop.shopTel1}-{shop.shopTel2}-{shop.shopTel3}
                                        </ST.BodyTelInfoP>
                                        <ST.BodyAddressP>위치</ST.BodyAddressP>
                                        <ST.BodyAddressInfoP>{shop.shopAddress}</ST.BodyAddressInfoP>
                                    </ST.MyInfo>
                                </ST.MyDiv>
                                <ST.BtnContainer>
                                    <ST.MyBtn onClick={() => navigate(`/shops/modify/${shop.shopId}`)} $color="#00bd8f">
                                        수정
                                    </ST.MyBtn>
                                    <ST.MyBtn
                                        onClick={() => DeleteHandler('shop', shops.indexOf(shop))}
                                        $color="#FD4141"
                                    >
                                        삭제
                                    </ST.MyBtn>
                                </ST.BtnContainer>
                            </ST.MyLi>
                        ))}

                        {/* 추가 등록 (+ 버튼) */}
                        <ST.MyAddBtn
                            onClick={() => AddHandler('shop')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                        >
                            <path
                                d="M30 50.4001C41.28 50.4001 50.4 41.2801 50.4 30.0001C50.4 18.7201 41.28 9.6001 30 9.6001C18.72 9.6001 9.59999 18.7201 9.59999 30.0001C9.59999 41.2801 18.72 50.4001 30 50.4001ZM30 12.0001C39.96 12.0001 48 20.0401 48 30.0001C48 39.9601 39.96 48.0001 30 48.0001C20.04 48.0001 12 39.9601 12 30.0001C12 20.0401 20.04 12.0001 30 12.0001Z"
                                fill="#DADADA"
                            />
                            <path d="M40.8 28.7998H19.2V31.1998H40.8V28.7998Z" fill="#DADADA" />
                            <path d="M31.2 19.2002H28.8V40.8002H31.2V19.2002Z" fill="#DADADA" />
                        </ST.MyAddBtn>
                    </ST.MyUl>
                </ST.ShopNPetSection>
            )}

            {myCategory === 'pet' && (
                <ST.ShopNPetSection>
                    <ST.MyUl>
                        {pets.map((pet) => (
                            <ST.MyLi key={pet.petId}>
                                <ST.MyDiv onClick={() => navigate(`/pet/${pet.petId}`)}>
                                    <ST.MyShopImg src={pet.imageUrls[0]} alt={pet.petName} />
                                    <ST.MyInfo>
                                        <ST.TitleH4>{pet.petName}</ST.TitleH4>
                                        <ST.BodyTimeP>성별</ST.BodyTimeP>
                                        <ST.BodyTimeInfoP>
                                            {pet.petGender === 'MALE' ? '남아' : '여아'}
                                        </ST.BodyTimeInfoP>
                                        <ST.BodyTelP>크기</ST.BodyTelP>
                                        <ST.BodyTelInfoP>
                                            {pet.petKind === 'SMALL'
                                                ? '소형'
                                                : pet.petKind === 'MEDIUM'
                                                  ? '중형'
                                                  : '대형'}
                                        </ST.BodyTelInfoP>
                                        <ST.BodyAddressP>특이사항</ST.BodyAddressP>
                                        <ST.BodyAddressInfoP>{pet.petInfo}</ST.BodyAddressInfoP>
                                    </ST.MyInfo>
                                </ST.MyDiv>
                                <ST.BtnContainer>
                                    <ST.MyBtn onClick={() => navigate(`/modify/${pet.petId}`)} $color="#00bd8f">
                                        수정
                                    </ST.MyBtn>
                                    <ST.MyBtn onClick={() => DeleteHandler('pet', pets.indexOf(pet))} $color="#FD4141">
                                        삭제
                                    </ST.MyBtn>
                                </ST.BtnContainer>
                            </ST.MyLi>
                        ))}

                        {/* 추가 등록 (+ 버튼) */}
                        <ST.MyAddBtn
                            onClick={() => AddHandler('pet')}
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                        >
                            <path
                                d="M30 50.4001C41.28 50.4001 50.4 41.2801 50.4 30.0001C50.4 18.7201 41.28 9.6001 30 9.6001C18.72 9.6001 9.59999 18.7201 9.59999 30.0001C9.59999 41.2801 18.72 50.4001 30 50.4001ZM30 12.0001C39.96 12.0001 48 20.0401 48 30.0001C48 39.9601 39.96 48.0001 30 48.0001C20.04 48.0001 12 39.9601 12 30.0001C12 20.0401 20.04 12.0001 30 12.0001Z"
                                fill="#DADADA"
                            />
                            <path d="M40.8 28.7998H19.2V31.1998H40.8V28.7998Z" fill="#DADADA" />
                            <path d="M31.2 19.2002H28.8V40.8002H31.2V19.2002Z" fill="#DADADA" />
                        </ST.MyAddBtn>
                    </ST.MyUl>
                </ST.ShopNPetSection>
            )}

            {chatRooms.length > 0 && (
                <ST.ShopNPetSection>
                    <ST.TitleH3>내가 만든 채팅방</ST.TitleH3>
                    <ST.MyUl>
                        {chatRooms.map((chatroom) => (
                            <ST.MyChatLi key={chatroom.roomId}>
                                <ST.MyChatDiv>
                                    <ST.MyChatP onClick={() => enterRoom(chatroom.roomId)}>
                                        <IoLogoWechat /> <span>{chatroom.name}</span>
                                    </ST.MyChatP>
                                    <p>
                                        {chatroom.tags?.map((tag) => (
                                                <ST.TagWords
                                                    key={tag.name}
                                                    onClick={() => DeleteTag(chatroom.roomId, tag.name)}
                                                >
                                                    {tag.name && `#${tag.name}`}
                                                    <AiFillMinusCircle style={TagMinus} />
                                                </ST.TagWords>
                                        ))}
                                    </p>
                                </ST.MyChatDiv>
                                <ST.BtnContainer>
                                    <ST.MyChatBtn
                                        onClick={() => AddTag(chatroom.roomId)}
                                        $color="#00bd8f"
                                        $backColor="#E9E9E6"
                                    >
                                        해시태그 추가
                                    </ST.MyChatBtn>
                                    <ST.MyChatBtn
                                        onClick={() => DeleteHandler('chat', chatRooms.indexOf(chatroom))}
                                        $color="#fff"
                                        $backColor="#FD4141"
                                    >
                                        채팅방 삭제
                                    </ST.MyChatBtn>
                                </ST.BtnContainer>
                            </ST.MyChatLi>
                        ))}
                    </ST.MyUl>
                </ST.ShopNPetSection>
            )}

            <ST.MyChatBtn onClick={handleModal} $color="#8F8E93" $backColor="#E9E9E6">
                탈퇴하기
            </ST.MyChatBtn>
            <ModalPortal>{modalOn && <LeaveUserModal onClose={handleModal} />}</ModalPortal>

        </ST.MyContainer>
    )
}

export default My

const TagMinus = {
    width: '13px',
    height: '13px',
    color: '#DADADA',
    borderRadius: '50%',
    position: 'absolute',
    top: '-5px',
    right: '-4px',
}
