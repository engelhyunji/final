// import { UserData } from "../../components/Signup/Signup";
// import instance from "../instance";


// // 회원가입 - navigate 사용을 위해 이사 !!
// export const userSignup = async (userData: UserData) => {
    
//     try {
//         await instance.post('/user/signup', userData);
//         alert('회원가입이 완료되었습니다🐕')
//     } catch (error) {
//         console.log('회원가입 : error 메세지',error);
//     }
// }

// // 로그인 - navigate 사용을 위해 이사 !!
// export const userLogin = async (email: string, password: string) => {

//     try {
//         const res = await instance.post('/user/login', {
//             email,
//             password
//         },);
//         alert('로그인이 완료되었습니다🐕')
//         const token = res.headers.authorization; // 서버 응답의 headers에서 토큰 추출
//         localStorage.setItem('accessToken', token);
//     } catch (error) {
//         console.log('로그인 실패 : error 메세지',error);
//     }
    
// }