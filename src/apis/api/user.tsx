import instance from "../instance";


export const postEmail = async (email: string) => {
    try {
        await instance.post('/api/user/email', {email})
        alert('이메일로 인증코드가 발송되었습니다.')
    } catch (err) {
        console.log('이메일 전송에러 :', err)
    }
}

export const postCode = async (email: string, verificationCode: string) => {
    try {
        await instance.post('/api/user/email/verify', {email, verificationCode})
        alert('이메일이 인증되었습니다.')
    } catch (err) {
        console.log('이메일과 인증코드 전송에러 :', err)
    }
}

