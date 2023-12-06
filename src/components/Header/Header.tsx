import React from 'react'
import NoLineLink from '../NoLineLink'
import * as St from './style'
import { useAuth } from '../../context/AuthContext'

const Header: React.FC = () => {
    const { isLogin, logout } = useAuth()

    return (
        <St.HeaderContainer>
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
                    <St.LogoutBtn onClick={logout}>로그아웃</St.LogoutBtn>
                ) : (
                    <NoLineLink to="/login">로그인</NoLineLink>
                )}
            </div>
        </St.HeaderContainer>
    )
}

export default Header
