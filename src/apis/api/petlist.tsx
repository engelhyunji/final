import instance from '../../apis/instance'

export interface PetDetails {
    userId: number
    petId: number
    nickname: string
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrls: string[]
    petLikes: number // 좋아요 수
    // registration_date: string;
}

export interface ApiResponse<T> {
    isSuccess: boolean
    code: number
    message: string
    result: {
        data: T
        nextPage: string | null
    }
}

// interface LikeResponse {
//     message: string
//     status: boolean
// }

// 좋아요 추가 함수
export const likePet = async (petId: number): Promise<number> => {
    const response = await instance.post(`/api/pets/${petId}/like`)
    return response.data.petLikes
}

// 좋아요 취소 함수
export const unlikePet = async (petId: number): Promise<number> => {
    const response = await instance.post(`/api/pets/${petId}/like`)
    return response.data.petLikes
}

// 펫 조회
export const fetchPetsWithCursor = async (cursor?: string, limit: number = 20) => {
    const url = cursor ? `/api/pets?lastPetId=${cursor}&limit=${limit}` : `/api/pets?limit=${limit}`
    try {
        const response = await instance.get<ApiResponse<PetDetails[]>>(url)
        return response.data.result.data
    } catch (error) {
        console.error('펫 목록 조회 오류:', error)
        throw error
    }
}

// // Pet 등록
// export const fetchPetDetails = async () => {
//     try {
//         const response = await instance.get<PetDetails>('/api/pets/mypage')
//         return response.data
//     } catch (error) {
//         console.error('Error fetching pet details:', error)
//         throw error
//     }
// }

// 펫 조회
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

// 펫 등록

// export const fetchPetDetail = async (petId: string): Promise<ApiResponse<PetDetails> | null> => {
//     try {
//         const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`)
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

// export const registerPet = async (petData: PetDetails): Promise<ApiResponse<PetDetails> | null> => {
//     try {
//         const response = await instance.post<ApiResponse<PetDetails>>('/api/pets', petData)
//         if (response.status === 200) {
//             return response.data
//         } else {
//             throw new Error(`오류 발생: ${response.status}`)
//         }
//     } catch (error) {
//         console.error('펫 등록 중 에러:', error)
//         return null
//     }
// }

// 서버로부터 펫 목록을 페이징하여 가져오는 함수
// export const fetchPetsWithCursor = async (cursor?: string, limit: number = 10): Promise<PetDetails[]> => {
//     try {
//         const response = await instance.get<ApiResponse<PetDetails[]>>(`/api/pets?lastPetId=${cursor}&limit=${limit}`)
//         if (response.status === 200 && response.data && response.data.result && response.data.result.data) {
//             return response.data.result.data // 펫 목록 반환
//         } else {
//             throw new Error(`오류 발생: ${response.status}`)
//         }
//     } catch (error) {
//         console.error('펫 목록 조회 오류:', error)
//         return [] // 에러 시 빈 배열 반환
//     }
// }

// Pet 등록
export const fetchPetDetails = async () => {
    try {
        const response = await instance.get<PetDetails>('/api/pets/mypage')
        return response.data
    } catch (error) {
        console.error('Error fetching pet details:', error)
        throw error
    }
}

// // Pet 상세 조회
// export const fetchPetDetail = async (petId: string): Promise<PetDetails> => {
//     try {
//         const response = await instance.get<PetDetails>(`/api/pets/${petId}`)
//         return response.data
//     } catch (error) {
//         console.error('Error fetching pet details:', error)
//         throw error
//     }
// }

// Pet 상세 정보 조회
// export const fetchPetDetail = async (petId: string): Promise<ApiResponse<PetDetails> | null> => {
//     try {
//         const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`)
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
// Pet 상세 정보 조회
export const fetchPetDetail = async (petId: string): Promise<ApiResponse<PetDetails> | null> => {
    try {
        const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`)
        if (response.status === 200) {
            return response.data // 여기에서 ApiResponse 객체를 반환
        } else {
            throw new Error(`오류 발생: ${response.status}`)
        }
    } catch (error) {
        console.error('에러:', error)
        return null
    }
}

export const getAllPets = async (lastPetId?: number, limit: number = 10): Promise<ApiResponse<Array<PetDetails>>> => {
    try {
        const url = lastPetId ? `/api/pets?lastPetId=${lastPetId}&limit=${limit}` : `/api/pets?limit=${limit}`
        const response = await instance.get<ApiResponse<Array<PetDetails>>>(url)
        return response.data
    } catch (error) {
        console.error('Error fetching pets:', error)
        throw error
    }
}

export const registerPet = async (petData: FormData): Promise<ApiResponse<PetDetails>> => {
    try {
        const response = await instance.post<ApiResponse<PetDetails>>('/api/pets', petData)
        return response.data
    } catch (error) {
        console.error('Error registering pet:', error)
        throw error
    }
}

export const updatePet = async (petId: number, petData: FormData): Promise<ApiResponse<PetDetails>> => {
    try {
        const response = await instance.put<ApiResponse<PetDetails>>(`/api/pets/${petId}`, petData)
        return response.data
    } catch (error) {
        console.error('Error updating pet:', error)
        throw error
    }
}

export const deletePet = async (petId: number): Promise<ApiResponse<void>> => {
    try {
        const response = await instance.delete<ApiResponse<void>>(`/api/pets/${petId}`)
        return response.data
    } catch (error) {
        console.error('Error deleting pet:', error)
        throw error
    }
}
