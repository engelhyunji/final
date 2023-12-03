import React, { useState } from 'react'
import { userSignup } from '../../apis/api/user'
import * as St from './style'

interface UserData {
    nickname: string
    phoneNumber: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        nickname: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSignUp = async () => {
        // 간단한 유효성 검사
        if (!userData.nickname || !userData.phoneNumber || !userData.email || !userData.password) {
            alert('모두 입력해주세요😺')
            return
        }
        try {
            // 회원가입 정보를 직접 처리
            await userSignup(userData)
            console.log('회원가입 정보:', userData)
        } catch (error) {
            console.error('회원가입 실패:', error)
            // 실패 시 추가적인 처리를 할 수 있습니다.
        }
    }

    return (
        <St.SignupContainer>
            <St.SignupBox>
                <h2>회원가입</h2>
                <St.SignupForm>
                        <St.SignupLabel htmlFor="nickname">닉네임 </St.SignupLabel>
                        <St.SignupInput
                            type="text"
                            id="nickname"
                            placeholder='닉네임 입력'
                            name="nickname"
                            value={userData.nickname}
                            onChange={handleInputChange}
                        />
                        <St.SignupLabel htmlFor="phoneNumber">전화번호 </St.SignupLabel>
                        <St.SignupInput
                            type="text"
                            id="phoneNumber"
                            placeholder='&#039;-&#039; 구분없이 입력'
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                        />
                        <St.SignupLabel htmlFor="email">이메일 </St.SignupLabel>
                        <St.SignupInput
                            type="text"
                            id="email"
                            placeholder='이메일 주소'
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <St.SignupLabel htmlFor="password">비밀번호 </St.SignupLabel>
                        <St.SignupInput
                            type="password"
                            id="password"
                            placeholder='비밀번호 입력'
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    <St.SignupBtn type="button" onClick={handleSignUp}>
                        가입하기
                    </St.SignupBtn>
                </St.SignupForm>
            </St.SignupBox>
        </St.SignupContainer>
    )
}

export default Signup
