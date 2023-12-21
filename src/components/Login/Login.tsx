import React, { useEffect, useRef, useState } from 'react'
import * as ST from './style'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'

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
            const res = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/user/login`, {
                email,
                password,
            })
            if (res) {
                login() // isLogin 상태변경
                const nickname = res.data.result.nickname
                localStorage.setItem('nickname', nickname)
                localStorage.setItem('email', res.data.result.email)
                alert(`${nickname}님 로그인이 완료되었습니다🐕`)
                navigate('/')

                const token = res.headers.authorization // 서버 응답 headers에서 토큰 추출
                localStorage.setItem('accessToken', token)

                // accessToken 만료시간(60분) 저장
                const expireAtDate = dayjs().add(60, 'minute').format('YYYY-MM-DD HH:mm:ss')
                localStorage.setItem('expireAt', expireAtDate)

                const refreshToken = res.headers['refresh-token']
                localStorage.setItem('Refresh-Token', refreshToken)
                // console.log('로그인 시 refreshToken 확인', refreshToken)
                // console.log('로그인 시 accessToken 확인', token)
                // console.log('로그인 시 expireAtDate 확인', expireAtDate)
            }
        } catch (error: any) {
            if (error.response.status === 403) {
                console.log('로그인 실패 : error 메세지', error)
                alert('유효하지 않은 계정입니다')
            }
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
                <ST.LoginTitleH2>로그인</ST.LoginTitleH2>
                <ST.LoginP>간단히 로그인하고 더 많은 서비스를 즐겨보세요!</ST.LoginP>
                <ST.LoginForm onSubmit={(e) => e.preventDefault()}>
                    <ST.LoginInputBox>
                        <ST.LoginLabel>이메일</ST.LoginLabel>
                        <ST.LoginInput
                            type="text"
                            id="email"
                            ref={idRef}
                            placeholder="이메일을 입력해주세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </ST.LoginInputBox>
                    <ST.LoginInputBox>
                        <ST.LoginLabel>비밀번호</ST.LoginLabel>
                        <ST.LoginInput
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            placeholder="비밀번호를 입력해주세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </ST.LoginInputBox>
                    <ST.LoginBtn type="button" onClick={handleLogin}>
                        로그인하기
                    </ST.LoginBtn>
                </ST.LoginForm>
                    <ST.LoginP>아직 회원이 아니신가요 ? 
                    <ST.NotUserP onClick={() => navigate('/signup')}> 회원가입하러 가기</ST.NotUserP>
                    </ST.LoginP>
                    {/* <ST.NotUserP onClick={() => navigate('/signup')}> ..이메일 찾기 / 비밀번호 찾기</ST.NotUserP> */}

            </ST.LoginBox>
        </ST.LoginContainer>
    )
}

export default Login