import instance from "../instance";


// export const postEmail = async (email: string) => {
//     try {
//         await instance.post('/api/user/email', {email})
//         alert('이메일로 인증코드가 발송되었습니다.')
//     } catch (err) {
//         console.log('이메일 전송에러 :', err)
//         alert('이미 가입된 이메일 입니다.')
//     }
// }

// export const postCode = async (email: string, verificationCode: string) => {
//     try {
//         await instance.post('/api/user/email/verify', {email, verificationCode})
//         alert('이메일이 인증되었습니다.')
//     } catch (err) {
//         console.log('이메일과 인증코드 전송에러 :', err)
//         alert('인증 코드가 맞지 않습니다.')
//     }
// }


// 로그아웃
export const postLogout = async () => {
    try {
        await instance.post('/api/user/logout')
    } catch (err) {
        console.log('로그아웃에러 :', err)
    }
}