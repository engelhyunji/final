import { useNavigate } from 'react-router-dom'
import { Pet, Shop, getMyShop, getMyPet, deleteShop } from '../../apis/api/api'
import * as ST from './style'
import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import instance from '../../apis/instance'
import { useAuth } from '../../context/AuthContext'

const My: React.FC = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const nickname = localStorage.getItem('nickname')
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
                        setShops(shopData)
                    }
                })
                .catch((error) => console.error('shop 삭제 에러', error))
        },
    })

    const DeleteHandler = (idx: number) => {
        if (confirm(`${shops[idx].shopName} 가게를 삭제하시겠습니까?`)) {
            mutation.mutate(shops[idx].shopId)
        }
    }

    const LeaveUserHandler = async () => {
        if (confirm('정말로 탈퇴하실건가요?😿')) {
            const password = prompt('비밀번호를 입력하시면 회원탈퇴가 완료됩니다🙊')
            if (password) {
                try{
                await instance.delete('/api/user/delete', { data: { password } })
                logout()
                } catch (err){
                    console.log(err)
                    alert('탈퇴실패 비밀번호가 틀렸습니다')
                }
            }
        }
        
    }

    return (
        <ST.MyContainer>
            <ST.TitleH2>{nickname}님의 마이 페이지</ST.TitleH2>

            {shops.length > 0 && (
                <ST.ShopNPetSection>
                    <ST.TitleH3>마이 샵</ST.TitleH3>
                    <ul>
                        {shops.map((shop) => (
                                <li key={shop.shopId}>
                                    <div onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                        <ST.MyShopImg src={shop.imageUrls[0]} alt={shop.shopName} />
                                        <p>가게 이름: {shop.shopName}</p>
                                        <p>가게 시간: {shop.shopTime}</p>
                                        <p>연락처: {shop.shopTel}</p>
                                        <p>주소: {shop.shopAddress}</p>
                                        <p>유형: {shop.shopType}</p>
                                        <p>소개: {shop.shopDescribe}</p>
                                    </div>
                                    <button onClick={() => DeleteHandler(shops.indexOf(shop))}>삭제</button>
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
                    등록된 SHOP 또는 PET 정보가 없습니다.
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

            <span onClick={LeaveUserHandler}>회원탈퇴</span>
        </ST.MyContainer>
    )
}

export default My
