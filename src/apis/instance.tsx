import axios from 'axios'

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL2,
})

// Axios 인터셉터 요청 전 수행
instance.interceptors.request.use(
    (config) => {
        console.log('인터셉트 요청 성공!')
        const token = localStorage.getItem('accessToken')
        console.log('요청 인터셉트 token', token)
        console.log('요청 인터셉트 config', config)
        if (token) {
            config.headers.Authorization = `${token}`
            console.log('config.headers.Authorization', config.headers.Authorization)
        }
        return config
    },
    (error) => {
        console.log('인터셉트 요청 오류ㅠ')
        return Promise.reject(error)
    },
)

export default instance
