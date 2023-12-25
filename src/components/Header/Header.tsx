import React from 'react'
import NoLineLink from '../NoLineLink'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const navigate = useNavigate()
    const { isLogin, logout } = useAuth()

    const logoUrl = './warwar.png'

    return (
        <ST.HeaderWrap>
            <ST.HeaderContainer>
                <ST.Logo onClick={() => navigate('/')}>
                    <ST.LogoImg src={logoUrl} alt="logo" />
                    <ST.LogoH1>와르와르</ST.LogoH1>
                </ST.Logo>
                <ST.GNBDiv>
                    <NoLineLink to="/petlist">
                        <h5>PET 목록</h5>
                    </NoLineLink>
                    <NoLineLink to="/shopslist">
                        <h5>SHOP 목록</h5>
                    </NoLineLink>
                    <NoLineLink to="/map">
                        <h5>MAP</h5>
                    </NoLineLink>
                    {isLogin ? (
                        <>
                            <NoLineLink to="/pet">
                                <h5>PET등록</h5>
                            </NoLineLink>
                            <NoLineLink to="/shops">
                                <h5>SHOP등록</h5>
                            </NoLineLink>
                            <NoLineLink to="/chat/room">
                                <h5>채팅목록</h5>
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
