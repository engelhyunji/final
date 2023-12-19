import React from 'react'
import * as ST from './style'
import MainTop from './MainTop/MainTop'
import ShopsList from './MainBottom/ShopsList'
import { useNavigate } from 'react-router-dom'
import Category from './Category/Category'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Main: React.FC = () => {
    const navigate = useNavigate()

    return (
        <ST.MainContainer>
            <ST.BannerContainer>
                <ST.Text>메인 이미지 넣기.</ST.Text>
                <ST.Text>내 가게 또는 반려동물 등록.</ST.Text>
                <ST.BtnContainer>
                    <ST.ShopBtn
                        onClick={() => {
                            navigate('/shops')
                        }}
                    >
                        가게 등록
                    </ST.ShopBtn>
                    <ST.PetBtn
                        onClick={() => {
                            navigate('/pet')
                        }}
                    >
                        애완동물 등록
                    </ST.PetBtn>
                </ST.BtnContainer>
            </ST.BannerContainer>

            <ST.TopWrapper>
                <Category />
            </ST.TopWrapper>
            <ST.ShopsWrapper>
                <ShopsList />
            </ST.ShopsWrapper>
            <ST.TopWrapper>
                <MainTop />
            </ST.TopWrapper>
        </ST.MainContainer>
    )
}

export default Main
