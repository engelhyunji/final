import { useNavigate } from "react-router-dom";
import instance from "../instance";

interface UserData {
    nickname: string;
    phoneNumber: string;
    email: string;
    password: string;
}


export const userSignup = async (userData: UserData) => {
    const navigate = useNavigate();

    try {
        await instance.post('/user/signup', userData);
        navigate('/login');
    } catch (error) {
        console.log('회원가입 : error',error);
    }
}

export const userLogin = async (email: string, password: string) => {
    const navigate = useNavigate();

    try {
        const res = await instance.post('/user/login', {
            email,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('로그인 성공 : res',res);
        const token = res.data.accessToken; // 서버 응답의 data에서 토큰 추출
        localStorage.setItem('accessToken', token); // localStorage에 토큰 저장
        navigate('/');
    } catch (error) {
        console.log('로그인 실패 : error',error);
    }
    
}
