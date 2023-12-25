import instance from '../../apis/instance'

export interface PetDetails {
    petId: number
    nickname: string
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrls: string[] // 배열 형태로 변경
}

export interface ApiResponse<T> {
    isSuccess: boolean
    message: string
    result: T
    status: number
}

// // Pet 조회
// export const fetchPets = async (): Promise<{ message: string; result: PetDetails[] } | null> => {
//     try {
//         const response = await instance.get<{ message: string; result: PetDetails[] }>('/api/pets')

//         if (response.status === 200) {
//             return response.data
//         } else {
//             throw new Error(`오류 발생: ${response.status}`)
//         }
//     } catch (error) {
//         console.error('에러:', error)
//         return null
//     }
// }

// Pet 조회
export const fetchPets = async (): Promise<ApiResponse<PetDetails[]> | null> => {
    try {
        const response = await instance.get<ApiResponse<PetDetails[]>>('/api/pets')

        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`오류 발생: ${response.status}`)
        }
    } catch (error) {
        console.error('에러:', error)
        return null
    }
}

// Pet 등록
export const fetchPetDetails = async () => {
    try {
        const response = await instance.get<PetDetails>('/api/pets/mypage')
        return response.data
    } catch (error) {
        console.error('에러:', error)
        throw error
    }
}
