import React from 'react'
import NoLineLink from '../NoLineLink'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isLogin, logout } = useAuth()

    const nickname = localStorage.getItem('nickname')

    const logoUrl = '../../../../public/임시 로고.png'

    return (
        <ST.HeaderWrap>
            <ST.HeaderContainer>
                <ST.Logo onClick={() => navigate('/')}>
                    <ST.LogoImg src={logoUrl} alt="logo" />
                    <ST.LogoH1>와르와르</ST.LogoH1>
                </ST.Logo>
                <ST.GNBDiv>
                    <NoLineLink to="/pet">
                        <h5>PET등록</h5>
                    </NoLineLink>
                    <NoLineLink to="/shops">
                        <h5>SHOP등록</h5>
                    </NoLineLink>
                    <NoLineLink to="/petlist">
                        <h5>PET목록</h5>
                    </NoLineLink>
                    {isLogin ? (
                        <>
                            <NoLineLink to={'/my'}>
                                <h5>{nickname}님의 마이페이지</h5>
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
