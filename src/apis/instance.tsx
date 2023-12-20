import axios from 'axios'
import dayjs from 'dayjs'

// 토큰 만료를 한 번만 표시하기 위한 플래그
let isTokenExpired = false


const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL,
})

// Axios 인터셉터 요청 전 수행
instance.interceptors.request.use(
    async (config) => {
        console.log('요청(토큰)인터셉트 성공!')
        const token = localStorage.getItem('accessToken')
        let refreshToken = localStorage.getItem('Refresh-Token')
        const expireAt = localStorage.getItem('expireAt')
        // console.log('인터셉터 요청 전 expireAt 확인', expireAt)
        // console.log('인터셉터 요청 전 Refresh-Token 확인', refreshToken)

        // accessToken 만료 남은 시간
        const expiredAtDate = dayjs(expireAt).diff(dayjs())
        // console.log('만료 남은 시간:', expiredAtDate)
        if (expiredAtDate < 0 && refreshToken) {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_SERVER_URL}/api/user/reissue`,
                {},
                {
                    headers: {
                        // Authorization: token,
                        'Refresh-Token': refreshToken,
                    },
                },
            )
            console.log('만료되고 리프레시 있으면 post 응답', response)
            console.log('만료되고 리프레시 있으면 리프레시:', refreshToken)

            if (response.headers) {
                let expireAtDate = dayjs().add(60, 'minute').format('YYYY-MM-DD HH:mm:ss')
                localStorage.setItem('Refresh-Token', response.headers['refresh-token'])
                localStorage.setItem('accessToken', response.headers.authorization)
                localStorage.setItem('expireAt', expireAtDate)
                // console.log('토큰 만료 후 리프레시있으면, 새 expireAtDate 확인', expireAtDate)
                // console.log('토큰 만료 후 리프레시 response.data', response.data)

                config.headers.Authorization = `${token}`
            }
            // else {
            //     alert("response.data 가 없어서?")
            //     console.log(response.data)
            // }
        } else {
            if (token) {
                config.headers.Authorization = `${token}`
                // console.log('엑세스토큰 만료되지 않아 그냥 전송', token)
            }
        }

        return config
    },
    (error) => {
        console.log('인터셉트 요청 오류ㅠ')
        return Promise.reject(error)
    },
)

// Axios 응답 받기 전 처리
instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // 토큰 만료 에러 처리 (401 Unauthorized)
        if (error.response.status === 4103 && !isTokenExpired) {
            // 경고창을 한 번만 표시하기 위해 플래그 설정
            isTokenExpired = true
            // 모든 정보 삭제
            localStorage.clear();

            alert('토큰이 만료되었습니다. 다시 로그인해주세요.')
            window.location.href = '/'
        }
        return Promise.reject(error)
    },
)

export default instance
