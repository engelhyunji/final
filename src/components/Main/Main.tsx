import React from 'react'
import * as St from './style'
import MainTop from './MainTop/MainTop'
import ShopsList from './MainBottom/ShopsList'
import { useNavigate } from 'react-router-dom'

const Main: React.FC = () => {
    const navigate = useNavigate();
    return (
        <St.MainContainer>
            <St.BannerContainer>
                메인이 될 이미지?
                <br /> 내 가게 또는 반려동물을 등록하세요
                <St.BtnContainer>
                    <St.ShopBtn onClick={() => {navigate('/shops')}}>Shop</St.ShopBtn>
                    <St.PetBtn onClick={() => {navigate('/pet')}}>Pet</St.PetBtn>
                </St.BtnContainer>
            </St.BannerContainer>
            
            <St.TopWrapper>
                <MainTop />
            </St.TopWrapper>
            <St.ShopsWrapper>
                <ShopsList />
            </St.ShopsWrapper>
        </St.MainContainer>
    )
}

export default Main