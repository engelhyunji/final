import React, { useState } from 'react'
import * as ST from './style'
import NoLineLink from '../NoLineLink'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // navigate 사용을 위해 컴포넌트 내로 이사.
    const userLogin = async (email: string, password: string) => {
        try {
            const res = await instance.post('/user/login', {
                email,
                password,
            })
            login() // isLogin 상태변경
            alert('로그인이 완료되었습니다🐕')
            navigate('/')

            const token = res.headers.authorization // 서버 응답의 headers에서 토큰 추출
            localStorage.setItem('accessToken', token)
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
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <ST.LoginInput
                        type="password"
                        id="password"
                        autoComplete="current-password" // 비밀번호 입력 필드에 대한 자동 완성
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
