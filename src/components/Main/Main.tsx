import React from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import Category from './Category/Category'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
<<<<<<< HEAD
import MainTop from './MainTop/MainTop'
=======
import { useAuth } from '../../context/AuthContext'
>>>>>>> 89bd31c74ede30b296b6becdc9cb2dc282ddd89a

const Main: React.FC = () => {
    const { isLogin } = useAuth()
    const navigate = useNavigate()

    return (
        <ST.MainContainer>
            <ST.BannerContainer>
                <ST.Warp>
                    <ST.Text2>
                        반려동물과 함께하는 매칭서비스, 와르와르 <br />
                        <ST.Text3>Shop 또는 Pet을 등록해보세요!</ST.Text3>
                    </ST.Text2>
                </ST.Warp>
                <ST.BtnContainer>
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
                                <br />
                                <ST.Text>Shop 등록하기 ⇀</ST.Text>
                            </ST.ShopBtn>
                            <ST.PetBtn
                                onClick={() => {
                                    navigate('/pet')
                                }}
                            >
                                <ST.Text1>
                                    귀여운 내새끼를
                                    <br />
                                    키우는 중이라면?
                                </ST.Text1>
                                <br />
                                <ST.Text>Pet 등록하기 ⇀</ST.Text>
                            </ST.PetBtn>
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
                                <br />
                                <ST.Text>채팅하러 가기 ⇀</ST.Text>
                            </ST.ShopBtn>
                            <ST.PetBtn
                                onClick={() => {
                                    navigate('/signup')
                                }}
                            >
                                <ST.Text1>
                                    등록할 나의 Shop 
                                    <br />
                                    또는 Pet이 있다면?
                                </ST.Text1>
                                <br />
                                <ST.Text>등록하기 ⇀</ST.Text>
                            </ST.PetBtn>
                        </>
                    )}
                </ST.BtnContainer>
            </ST.BannerContainer>

            <ST.TopWrapper>
                {/* SHOP 카테고리 슬라이드 */}
                <Category />
            </ST.TopWrapper>

            <ST.TopWrapper>
                {/* PET 목록 */}
                <MainTop />
            </ST.TopWrapper>
        </ST.MainContainer>
    )
}

export default Main
