import React, { useState } from 'react'
import { userSignup } from '../../apis/api/user'
import * as St from './style'
import { useNavigate } from 'react-router-dom'

export interface UserData {
    nickname: string
    phoneNumber: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const navigete = useNavigate();
    const [userData, setUserData] = useState<UserData>({
        nickname: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUp = async () => {
        if (!userData.nickname || !userData.phoneNumber || !userData.email || !userData.password) {
            alert('정보를 모두 입력해주세요😺');
            return;
        }

            await userSignup(userData);
            console.log('회원가입 정보:', userData);
            navigete('/login');

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
