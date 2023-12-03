import React, { useState } from 'react';
import { userSignup } from '../../apis/api/user';

interface UserData {
    nickname: string;
    phoneNumber: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        nickname: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSignUp = async () => {
        // 간단한 유효성 검사
        if (!userData.nickname || !userData.phoneNumber || !userData.email || !userData.password) {
            alert('모두 입력해주세요😺');
            return;
        }
        try {
            // 회원가입 정보를 직접 처리
            await userSignup(userData);
            console.log('회원가입 정보:', userData);
        } catch (error) {
            console.error('회원가입 실패:', error);
            // 실패 시 추가적인 처리를 할 수 있습니다.
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={userData.nickname}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">전화번호:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" onClick={handleSignUp}>
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default Signup;
