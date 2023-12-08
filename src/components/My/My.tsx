import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getDetailPet, getDetailShop } from '../../apis/api/api'
import * as ST from './style'
import React, { useState, useEffect } from 'react'

interface MyPageProps {
    userId: number
}

const My: React.FC<MyPageProps> = ({ userId }) => {
    const navigate = useNavigate();
    const [shops, setShops] = useState<Shop[]>([])
    const [pets, setPets] = useState<Pet[]>([])
    // const [displayedItems, setDisplayedItems] = useState<(Shop | Pet)[]>([])

    useEffect(() => {
        // 사용자가 등록한 가게 정보
        getDetailShop()
            .then((shopData) => {
                if (shopData) {
                    setShops([shopData]);
                } else {
                    // 가게 정보가 없을 경우
                }
            })
            .catch((error) => console.error('shop 정보 불러오기 오류:', error))

        // 사용자가 등록한 동물 정보
        getDetailPet()
            .then((petData) => {
                if (petData) {
                    setPets([petData]);
                } else {
                    // 애완동물 정보가 없을 경우
                }
            })
            .catch((error) => console.error('pet 정보 불러오기 오류:', error))
    }, [userId])

    // shops 또는 pets가 추가될 때 displayedItems을 업데이트
    // useEffect(() => {
    //     if (shops.length > 0) {
    //         setDisplayedItems(shops)
    //     } else if (pets.length > 0) {
    //         setDisplayedItems(pets)
    //     }
    // }, [shops, pets])

    return (
        <ST.MyContainer>
            <ST.TitleH2>마이 페이지</ST.TitleH2>

            {shops.length > 0 && (
                <ST.ShopNPetSection>
                    <ST.TitleH3>마이 샵</ST.TitleH3>
                    <ul>
                        {shops.map((shop) => (
                            <li key={shop.userId}>
                                <img src={shop.imageUrl} alt={shop.shopName} />
                                <p>가게 이름: {shop.shopName}</p>
                                <p>가게 시간: {shop.shopTime}</p>
                                <p>연락처: {shop.shopTel}</p>
                                <p>주소: {shop.shopAddress}</p>
                                <p>유형: {shop.shopType}</p>
                                <p>소개: {shop.shopDescribe}</p>
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
                            <li key={pet.userId}>
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
                        <ST.ShopBtn onClick={() => {navigate('/shops')}}>Shop</ST.ShopBtn>
                        <ST.PetBtn onClick={() => {navigate('/pet')}}>Pet</ST.PetBtn>
                    </ST.BtnContainer>
                </ST.ShopNPetSection>
            )}
        </ST.MyContainer>
    )
}

export default My;
