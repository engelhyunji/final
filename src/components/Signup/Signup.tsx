import React, { useEffect, useRef, useState } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import { postCode, postEmail } from '../../apis/api/user'
import Timer from './Timer'

export interface UserData {
    nickname: string
    phoneNumber: string
    email: string
    password: string
}

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    // 인증코드 5분 타이머 컨트롤
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
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
        // email 형식 유효성 (정규식)
        const emailEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i
        if (emailEx.test(email)) {
            try {
                await postEmail(email)
                setIsTimerRunning(true)
            } catch (err: any) {
                console.log('이메일 전송에러 :', err)
            }
        } else {
            alert('이메일 형식이 맞지 않습니다.')
        }
    }

    const codeVerify = async () => {
        try {
            await postCode(userData.email, code)
            setIsTimerRunning(false)
        } catch (err: any) {
            console.log('이메일 인증에러 :', err)
        }
    }

    const userSignup = async (userData: UserData) => {
        try {
            await instance.post('/api/user/signup', userData)
            alert('회원가입이 완료되었습니다🐕')
            navigate('/login')
        } catch (err: any) {
            console.log('회원가입 error 메세지', err)
            if (err?.response.status === 409) {
                // 이미 등록된 이메일
                alert(err.response.data.message)
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSignUp = async () => {
        // 비밀번호 유효성 검사
        let num = userData.password.search(/[0-9]/g)
        let eng = userData.password.search(/[a-z]/gi)
        if (!code || !userData.nickname || !userData.phoneNumber || !userData.email || !userData.password) {
            alert('정보를 모두 입력해주세요😺')
            return false
        } else if (userData.password.length < 4 || userData.password.length > 12) {
            alert('4자리 ~ 12자리 이내로 입력해주세요.')
            return false
        } else if (userData.password.search(/\s/) != -1) {
            alert('비밀번호는 공백 없이 입력해주세요.')
            return false
        } else if (num < 0 || eng < 0) {
            alert('숫자, 영문을 혼합하여 입력해주세요.')
            return false
        } else if(userData.phoneNumber.length < 10 || userData.phoneNumber.length > 11) {
            alert('전화번호는 10~11자리로 입력해주세요.')
            return false
        }else {
            console.log('비번 유효성 통과')
            await userSignup(userData)

            return true
        }
        // console.log('회원가입 정보:', userData)
    }

    return (
        <ST.SignupContainer>
            <ST.SignupBox>
                <ST.SignupTitleH2>회원가입</ST.SignupTitleH2>
                <ST.SignupP>간단한 정보 입력으로 회원가입하고 더 많은 서비스를 즐겨보세요!</ST.SignupP>
                <ST.SignupForm onSubmit={(e) => e.preventDefault()}>
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
                        <ST.SignupInputDiv>
                            <ST.SignupCodeInput
                                type="text"
                                placeholder="인증코드를 입력해주세요"
                                name="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            {isTimerRunning && <Timer mm={'5'} ss={'0'} isRunning={isTimerRunning} />}
                        </ST.SignupInputDiv>
                        <ST.ComfirmBtn onClick={codeVerify}>확인</ST.ComfirmBtn>
                    </ST.VerifyBox>

                    <ST.SignupInputBox>
                        <ST.SignupLabel>비밀번호 </ST.SignupLabel>
                        <ST.SignupInput
                            type="password"
                            id="password"
                            placeholder="숫자, 영문 조합 4 ~ 12자"
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSignUp
                                }
                            }}
                        />
                    </ST.SignupInputBox>

                    <ST.SignupBtn type="button" onClick={handleSignUp}>
                        가입하기
                    </ST.SignupBtn>
                </ST.SignupForm>
                <ST.SignupP>
                    이미 회원이신가요 ?
                    <ST.SignupSpan onClick={() => navigate('/login')}> 로그인하러 가기</ST.SignupSpan>
                </ST.SignupP>
            </ST.SignupBox>
        </ST.SignupContainer>
    )
}

export default Signup
