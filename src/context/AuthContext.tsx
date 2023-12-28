// 로그인 상태 전역으로 관리
import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextProps {
    isLogin: boolean
    login: () => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(() => {
        const storedToken = localStorage.getItem('accessToken')
        // console.log('처음 localStorage.getItem(accessToken) 토큰 확인', storedToken)
        return !!storedToken // 토큰 존재하면 true, 아니면 false
    })

    const login = useCallback(() => {
        setIsLogin(true)
    }, [])

    const logout = useCallback(() => {
        setIsLogin(false)
        navigate('/');
        localStorage.clear() // 저장된 모든 (인가)정보 삭제
        console.log('localStorage.getItem(accessToken) 토큰삭제 확인', localStorage.getItem('accessToken')) // 토큰 삭제 확인
    }, [])

    const value = useMemo(() => ({ isLogin, login, logout }), [isLogin, login, logout])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth는 반드시 AuthProvider 내에서 사용되어야 함')
    }
    return context
}
