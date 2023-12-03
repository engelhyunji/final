import instance from "../instance";

interface UserData {
    nickname: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export const userSignup = async (userData: UserData) => {
    try {
        await instance.post('/user/signup', userData);
    } catch (error) {
        console.log('회원가입 : error',error);
    }
}

export const userLogin = async (email: string, password: string) => {
    try {
        await instance.post('/user/login', {
            email,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log('로그인 실패 : error',error);
    }
    
}

