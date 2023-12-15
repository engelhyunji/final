import React, { useEffect, useRef, useState } from 'react'
import * as ST from './style'
import NoLineLink from '../NoLineLink'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import dayjs from 'dayjs'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const idRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (idRef.current) {
            idRef.current.focus()
        }
    }, [])

    const userLogin = async (email: string, password: string) => {
        try {
            const res = await instance.post('/api/user/login', {
                email,
                password,
            })
            if (res) {
                login() // isLogin 상태변경
                const nickname = res.data.data
                localStorage.setItem('nickname', nickname)
                alert(`${nickname}님 로그인이 완료되었습니다🐕`)
                navigate('/')

                const token = res.headers.authorization // 서버 응답 headers에서 토큰 추출
                localStorage.setItem('accessToken', token)

                // accessToken 만료시간(60분) 저장
                let expireAtDate = dayjs().add(60, 'minute').format('YYYY-MM-DD HH:mm:ss')
                localStorage.setItem('expireAt', expireAtDate)

                const refreshToken = res.headers["refresh-token"]
                localStorage.setItem('Refresh-Token', refreshToken)
                // console.log('로그인 시 accessToken 확인', refreshToken)
                // console.log('로그인 시 refreshToken 확인', token)
                // console.log('로그인 시 expireAtDate 확인', expireAtDate)
            }
        } catch (error) {
            console.log('로그인 실패 : error 메세지', error)
        }
    }

    const handleLogin = async () => {
        if (!email || !password) {
            alert('이메일 비밀번호를 입력해주세요🐶')
            return
        }
        await userLogin(email, password)
    }

    return (
        <ST.LoginContainer>
            <ST.LoginBox>
                <h2>로그인</h2>
                <ST.LoginForm onSubmit={(e) => e.preventDefault()}>
                    <ST.LoginInput
                        type="text"
                        id="email"
                        ref={idRef}
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ST.LoginInput
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <ST.LoginBtn type="button" onClick={handleLogin}>
                        로그인하기
                    </ST.LoginBtn>
                </ST.LoginForm>
                <ST.GoSignupDiv>
                    <ST.NotUserP>아직 회원이 아니시면</ST.NotUserP>
                    <NoLineLink to="/signup">회원가입</NoLineLink>
                </ST.GoSignupDiv>
            </ST.LoginBox>
        </ST.LoginContainer>
    )
}

export default Login
