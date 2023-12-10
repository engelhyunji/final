import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getMyShop, getMyPet, deleteShop } from '../../apis/api/api'
import * as ST from './style'
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'

const My: React.FC = () => {
    const navigate = useNavigate()
    const [shops, setShops] = useState<Shop[]>([])
    const [pets, setPets] = useState<Pet[]>([])


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
    }, [])

    const mutation = useMutation(deleteShop, {
        onSuccess: () => {
            getMyShop()
            .then((shopData) => {
                if (shopData) {
                    setShops(shopData);
                }
            })
            .catch((error) => console.error('shop 삭제 업데이트 에러', error));
        },
    })

    // [삭제] 함수(알림창 confirm하면 삭제)
    const RemoveHandler = (e: number) => {
        const DeleteMassage = `${shops[e].shopName} 가게를 삭제하시겠습니까?`;
        if (window.confirm(DeleteMassage)) {
            // dispatch(removeBook(book.id));
            mutation.mutate(shops[e].shopId)
        }
    }

    return (
        <ST.MyContainer>
            <ST.TitleH2>마이 페이지</ST.TitleH2>

            {shops.length > 0 && (
                <ST.ShopNPetSection>
                    <ST.TitleH3>마이 샵</ST.TitleH3>
                    <ul>
                        {shops.map((shop) => (
                            <li key={shop.shopId}>
                                <ST.MyShopImg src={shop.imageUrls[0]} alt={shop.shopName} />
                                <p>가게 이름: {shop.shopName}</p>
                                <p>가게 시간: {shop.shopTime}</p>
                                <p>연락처: {shop.shopTel}</p>
                                <p>주소: {shop.shopAddress}</p>
                                <p>유형: {shop.shopType}</p>
                                <p>소개: {shop.shopDescribe}</p>
                                <button onClick={() => RemoveHandler(shops.indexOf(shop))}>삭제</button>
                            </li>
                            
                        ))}
                    </ul>
                    
                </ST.ShopNPetSection>
            )}

            {pets.length > 0 && (
                <ST.ShopNPetSection>
                    <ST.TitleH3>마이 펫</ST.TitleH3>
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet.petId}>
                                <img src={pet.imageUrl} alt={pet.petName} />
                                <p>반려동물 이름: {pet.petName}</p>
                                <p>반려동물 생일: {pet.petBirth}</p>
                                <p>반려동물 특이사항: {pet.petInfo}</p>
                            </li>
                        ))}
                    </ul>
                </ST.ShopNPetSection>
            )}

            {shops.length === 0 && pets.length === 0 && (
                <ST.ShopNPetSection>
                    등록된 샵 또는 펫 정보가 없습니다.
                    <br /> 내 가게 또는 반려동물을 등록해보세요!
                    <ST.BtnContainer>
                        <ST.ShopBtn
                            onClick={() => {
                                navigate('/shops')
                            }}
                        >
                            Shop
                        </ST.ShopBtn>
                        <ST.PetBtn
                            onClick={() => {
                                navigate('/pet')
                            }}
                        >
                            Pet
                        </ST.PetBtn>
                    </ST.BtnContainer>
                </ST.ShopNPetSection>
            )}
        </ST.MyContainer>
    )
}

export default My
