import React, { useEffect, useRef, useState } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'

export interface UserData {
    nickname: string
    phoneNumber: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<UserData>({
        nickname: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const nickRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (nickRef.current) {
            nickRef.current.focus();
        };
    }, []);

    const userSignup = async (userData: UserData) => {
        try {
            await instance.post('/user/signup', userData)
            alert('회원가입이 완료되었습니다🐕')
            navigate('/login')
        } catch (error) {
            console.log('회원가입 : error 메세지', error)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSignUp = async () => {
        if (!userData.nickname || !userData.phoneNumber || !userData.email || !userData.password) {
            alert('정보를 모두 입력해주세요😺')
            return
        }
        await userSignup(userData)
        console.log('회원가입 정보:', userData)
    }

    return (
        <ST.SignupContainer>
            <ST.SignupBox>
                <h2>회원가입</h2>
                <ST.SignupForm>
                    <ST.SignupLabel htmlFor="nickname">닉네임 </ST.SignupLabel>
                    <ST.SignupInput
                        type="text"
                        id="nickname"
                        ref={nickRef}
                        placeholder="닉네임 입력"
                        name="nickname"
                        value={userData.nickname}
                        onChange={handleInputChange}
                    />
                    <ST.SignupLabel htmlFor="phoneNumber">전화번호 </ST.SignupLabel>
                    <ST.SignupInput
                        type="text"
                        id="phoneNumber"
                        placeholder="&#039;-&#039; 구분없이 입력"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <ST.SignupLabel htmlFor="email">이메일 </ST.SignupLabel>
                    <ST.SignupInput
                        type="text"
                        id="email"
                        placeholder="이메일 주소"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                    <ST.SignupLabel htmlFor="password">비밀번호 </ST.SignupLabel>
                    <ST.SignupInput
                        type="password"
                        id="password"
                        placeholder="비밀번호 입력"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                    <ST.SignupBtn type="button" onClick={handleSignUp}>
                        가입하기
                    </ST.SignupBtn>
                </ST.SignupForm>
            </ST.SignupBox>
        </ST.SignupContainer>
    )
}

export default Signup
