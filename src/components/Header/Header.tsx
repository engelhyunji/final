import React from 'react'
import NoLineLink from '../NoLineLink'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'

const Header: React.FC = () => {
    const { isLogin, logout } = useAuth()

    return (
        <ST.HeaderContainer>
            <NoLineLink to="/">
                <h1>와르와르</h1>
            </NoLineLink>
            <div>
                <NoLineLink to="/pet">
                    <h1>애견 등록</h1>
                </NoLineLink>
                <NoLineLink to="/shops">
                    <h1>가게 등록</h1>
                </NoLineLink>
                {isLogin ? (
                    <ST.LogoutBtn onClick={logout}>로그아웃</ST.LogoutBtn>
                ) : (
                    <NoLineLink to="/login">로그인</NoLineLink>
                )}
            </div>
        </ST.HeaderContainer>
    )
}

export default Header
