import React from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import Category from './Category/Category'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import MainTop from './MainTop/MainTop'
import { useAuth } from '../../context/AuthContext'
import NoLineLink from '../NoLineLink'

const Main: React.FC = () => {
    const { isLogin } = useAuth()
    const navigate = useNavigate()

    return (
        <>
            <ST.Container>
                <ST.BannerContainer>
                    <ST.BannerImage />
                    <ST.BtnContainer>
                        <ST.Warp>
                            <ST.Text2>반려동물과 함께하는 매칭서비스, 와르와르</ST.Text2>
                            <ST.Text3>가게 또는 강아지를 등록해보세요!</ST.Text3>
                        </ST.Warp>
                        {isLogin ? (
                            <>
                                <ST.ShopBtn
                                    onClick={() => {
                                        navigate('/shops')
                                    }}
                                >
                                    <ST.Text1>
                                        가게를 운영하는
                                        <br />
                                        사장님이라면?
                                    </ST.Text1>
                                    <ST.Text>가게 등록하기 ⇀</ST.Text>
                                </ST.ShopBtn>
                                <ST.ShopBtn
                                    onClick={() => {
                                        navigate('/pet')
                                    }}
                                >
                                    <ST.Text1>
                                        귀여운 강아지를
                                        <br />
                                        키우는 중이라면?
                                    </ST.Text1>
                                    <ST.Text>강아지 등록하기 ⇀</ST.Text>
                                </ST.ShopBtn>
                            </>
                        ) : (
                            <>
                                {/* 비회원 상태: 회원가입 유도 */}
                                <ST.ShopBtn
                                    onClick={() => {
                                        navigate('/signup')
                                    }}
                                >
                                    <ST.Text1>
                                        산책갈 사람?
                                        <br />
                                        실시간으로 소통하자
                                    </ST.Text1>
                                    <ST.Text>채팅하러 가기 ⇀</ST.Text>
                                </ST.ShopBtn>
                                <ST.ShopBtn
                                    onClick={() => {
                                        navigate('/signup')
                                    }}
                                >
                                    <ST.Text1>
                                        등록할 나의 가게
                                        <br />
                                        또는 강아지가 있다면?
                                    </ST.Text1>
                                    <ST.Text>등록하기 ⇀</ST.Text>
                                </ST.ShopBtn>
                            </>
                        )}
                    </ST.BtnContainer>
                </ST.BannerContainer>

                <ST.OverlayContainer2>
                    <ST.TopWrapper>
                        <ST.TextWrapper>
                            <ST.PetText>가게</ST.PetText>
                            <ST.PetText1>
                                실시간으로 뜨는
                                <br />
                                곳들을 보여드려요
                            </ST.PetText1>
                            {/* <ST.PetText2>더보기 ⇀</ST.PetText2> */}
                            <ST.Wrap1>
                                <NoLineLink to={`/shopslist`}>
                                    <ST.PetText2>더보기 ⇀</ST.PetText2>
                                </NoLineLink>
                            </ST.Wrap1>
                        </ST.TextWrapper>
                        <Category />
                    </ST.TopWrapper>
                </ST.OverlayContainer2>

                <ST.OverlayContainer>
                    <ST.PetContent>
                        <ST.TextWrapper>
                            <ST.PetText>반려동물</ST.PetText>
                            <ST.PetText3>
                                다들 우리 강아지
                                <br /> 보고 가세요!
                            </ST.PetText3>
                            {/* <ST.PetText2>더보기 ⇀</ST.PetText2> */}
                            <ST.Wrap1>
                                <NoLineLink to={`/petlist`}>
                                    <ST.PetText2>더보기 ⇀</ST.PetText2>
                                </NoLineLink>
                            </ST.Wrap1>
                        </ST.TextWrapper>
                    </ST.PetContent>
                    <MainTop />
                </ST.OverlayContainer>
                <ST.PetBackImage />
                <ST.Bottom />
            </ST.Container>
        </>
    )
}

export default Main
