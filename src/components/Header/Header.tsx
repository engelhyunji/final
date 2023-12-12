import React from 'react'
import NoLineLink from '../NoLineLink'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'

const Header: React.FC = () => {
    const { isLogin, logout } = useAuth();

    const nickname = localStorage.getItem('nickname');

    return (
        <ST.HeaderContainer>
            <NoLineLink to="/">
                <h5>와르와르</h5>
            </NoLineLink>
            <div>
                <NoLineLink to="/pet">
                    <h5>애견 등록</h5>
                </NoLineLink>
                <NoLineLink to="/shops">
                    <h5>가게 등록</h5>
                </NoLineLink>
                <NoLineLink to="/petlist">
                    <h5>애견 전체조회</h5>
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
            </div>
        </ST.HeaderContainer>
    )
}

export default Header
