import instance from "../instance";
import { UserData } from "../../components/Signup/Signup";

// 회원가입 - 완료
export const userSignup = async (userData: UserData) => {

    try {
        await instance.post('/user/signup', userData);
        alert('회원가입이 완료되었습니다🐕')
    } catch (error) {
        console.log('회원가입 : error',error);
    }
}

// 로그인 - 토큰 작업 중
export const userLogin = async (email: string, password: string) => {

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
        alert('로그인이 완료되었습니다🐕')
        const token = res.headers.authorization; // 서버 응답의 headers에서 토큰 추출
        console.log("res.headers.authorization",res.headers.authorization);
        console.log("res",res);
        localStorage.setItem('accessToken', token); // localStorage에 토큰 저장
    } catch (error) {
        console.log('로그인 실패 : error',error);
    }
    
}

