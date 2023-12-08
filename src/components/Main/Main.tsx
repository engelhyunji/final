import React from 'react'
import * as ST from './style'
import MainTop from './MainTop/MainTop'
import ShopsList from './MainBottom/ShopsList'
import { useNavigate } from 'react-router-dom'

const Main: React.FC = () => {
    const navigate = useNavigate()
    return (
        <ST.MainContainer>
            <ST.BannerContainer>
                메인이 될 이미지?
                <br /> 내 가게 또는 반려동물을 등록하세요
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
            </ST.BannerContainer>

            <ST.TopWrapper>
                <MainTop />
            </ST.TopWrapper>
            <ST.ShopsWrapper>
                <ShopsList />
            </ST.ShopsWrapper>
        </ST.MainContainer>
    )
}

export default Main
