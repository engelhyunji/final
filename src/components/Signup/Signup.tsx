import React, { useEffect, useRef, useState } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import { postCode, postEmail } from '../../apis/api/user'
import AuthTimer from './AuthTimer'

export interface UserData {
    nickname: string
    phoneNumber: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [userData, setUserData] = useState<UserData>({
        nickname: '',
        phoneNumber: '',
        email: '',
        password: '',
    })

    const nickRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (nickRef.current) {
            nickRef.current.focus()
        }
    }, [])

    const emailVerify = async (email: UserData['email']) => {
        await postEmail(email)
    }

    const codeVerify = async () => {
        await postCode(userData.email, code)
    }

    const userSignup = async (userData: UserData) => {
        try {
            await instance.post('/api/user/signup', userData)
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
                <ST.SignupTitleH2>회원가입</ST.SignupTitleH2>
                <ST.SignupP>간단한 정보 입력으로 회원가입하고 더 많은 서비스를 즐겨보세요!</ST.SignupP>
                <ST.SignupForm onSubmit={(event) => event.preventDefault()}>

                    <ST.SignupInputBox>
                        <ST.SignupLabel>이메일 </ST.SignupLabel>
                        <ST.SignupInput
                            type="text"
                            id="email"
                            placeholder="이메일을 입력해주세요"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </ST.SignupInputBox>
                    
                    <ST.SignupEBtn onClick={() => emailVerify(userData.email)}>인증코드 발송</ST.SignupEBtn>

                    <ST.VerifyBox>
                    <ST.SignupInput
                        type="text"
                        placeholder="인증코드를 입력해주세요"
                        name="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    {/* <AuthTimer /> */}
                    <ST.ComfirmBtn onClick={codeVerify}>확인</ST.ComfirmBtn>
                    </ST.VerifyBox>

                    <ST.SignupInputBox>
                        <ST.SignupLabel>비밀번호 </ST.SignupLabel>
                        <ST.SignupInput
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해주세요"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                    </ST.SignupInputBox>

                    <ST.SignupInputBox>
                        <ST.SignupLabel>닉네임 </ST.SignupLabel>
                        <ST.SignupInput
                            type="text"
                            id="nickname"
                            ref={nickRef}
                            placeholder="닉네임을 입력해주세요"
                            name="nickname"
                            value={userData.nickname}
                            onChange={handleInputChange}
                        />
                    </ST.SignupInputBox>

                    <ST.SignupInputBox>
                        <ST.SignupLabel>전화번호 </ST.SignupLabel>
                        <ST.SignupInput
                            type="text"
                            id="phoneNumber"
                            placeholder="전화번호를 입력해주세요 ( &#039;-&#039; 구분없이 )"
                            name="phoneNumber"
                            value={userData.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </ST.SignupInputBox>

                    <ST.SignupBtn type="button" onClick={handleSignUp}>
                        가입하기
                    </ST.SignupBtn>
                </ST.SignupForm>
                <ST.SignupP>이미 회원이신가요 ? 
                    <ST.SignupSpan onClick={() => navigate('/login')}> 로그인하러 가기</ST.SignupSpan>
                </ST.SignupP>

            </ST.SignupBox>
        </ST.SignupContainer>
    )
}

export default Signup
