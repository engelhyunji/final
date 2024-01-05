import React from 'react'
import NoLineLink from '../NoLineLink'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const navigate = useNavigate()
    const { isLogin, logout } = useAuth()

    // const logoUrl = './LogoVer1.png'
    // const logoTypoUrl = './TypoBeige.png'
    const logoUrl = 'https://moon-test1-bucket.s3.ap-northeast-2.amazonaws.com/LogoVer1.png'
    const logoTypoUrl = 'https://moon-test1-bucket.s3.ap-northeast-2.amazonaws.com/TypoBeige.png'

    return (
        <ST.HeaderWrap>
            <ST.HeaderContainer>
                <ST.LogoBox onClick={() => navigate('/')}>
                    <ST.Logo $logoUrl={logoUrl}></ST.Logo>
                    <ST.LogoH1 $logoUrl={logoTypoUrl}></ST.LogoH1>
                </ST.LogoBox>

                <ST.GNBDiv>
                    <NoLineLink to="/shopslist">
                        <h5>가게</h5>
                    </NoLineLink>
                    <NoLineLink to="/petlist">
                        <h5>반려동물</h5>
                    </NoLineLink>

                    <NoLineLink to="/map">
                        <h5>지도</h5>
                    </NoLineLink>
                    {isLogin ? (
                        <>
                            {/* <NoLineLink to="/pet">
                                <h5>PET등록</h5>
                            </NoLineLink>
                            <NoLineLink to="/shops">
                                <h5>SHOP등록</h5>
                            </NoLineLink> */}
                            <NoLineLink to="/chat/room">
                                <h5>채팅</h5>
                            </NoLineLink>
                            <NoLineLink to={'/my'}>
                                <h5>마이페이지</h5>
                            </NoLineLink>
                            <ST.LogoutBtn onClick={logout}>로그아웃</ST.LogoutBtn>
                        </>
                    ) : (
                        <NoLineLink to="/login">
                            <h5>로그인</h5>
                        </NoLineLink>
                    )}
                </ST.GNBDiv>
            </ST.HeaderContainer>
        </ST.HeaderWrap>
    )
}

export default Header
