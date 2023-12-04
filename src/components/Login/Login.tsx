import React, { useState } from 'react'
import { userLogin } from '../../apis/api/user'
import * as St from './style'
import NoLineLink from '../NoLineLink'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login: React.FC = () => {
    const navigete = useNavigate()
    const { login } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if (!email || !password) {
            alert('이메일 비밀번호를 입력해주세요🐶')
            return
        }
        await userLogin(email, password);
        navigete('/');
        login(); // isLogin 상태변경
    }

    return (
        <St.LoginContainer>
            <St.LoginBox>
                <h2>로그인</h2>
                <St.LoginForm onSubmit={(e) => e.preventDefault()}>
                    <St.LoginInput
                        type="text"
                        id="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <St.LoginInput
                        type="password"
                        id="password"
                        autoComplete="current-password" // 비밀번호 입력 필드에 대한 자동 완성
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <St.LoginBtn type="button" onClick={handleLogin}>
                        로그인하기
                    </St.LoginBtn>
                </St.LoginForm>
                <St.GoSignupDiv>
                    <St.NotUserP>아직 회원이 아니시면</St.NotUserP>
                    <NoLineLink to="/signup">회원가입</NoLineLink>
                </St.GoSignupDiv>
            </St.LoginBox>
        </St.LoginContainer>
    )
}

export default Login
