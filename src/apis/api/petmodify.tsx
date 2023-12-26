import instance from '../../apis/instance'

export interface PetDetails {
    petId: number
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrl: string
}

export interface ApiResponse<T> {
    isSuccess: boolean
    message: string
    result: T
}

// // Pet 상세 조회
// export const fetchPetDetail = async (petId: number): Promise<PetDetails> => {
//     const response = await instance.get<PetDetails>(`/api/pets/${petId}`)
//     return response.data
// }

// // Pet 업데이트
// export const updatePet = async (petId: number, formData: FormData): Promise<void> => {
//     await instance.put(`/api/pets/${petId}`, formData)
// }

// // Pet 삭제
// export const deletePet = async (petId: number): Promise<void> => {
//     await instance.delete(`/api/pets/${petId}`)
// }

export const fetchPetDetail = async (petId: number): Promise<ApiResponse<PetDetails>> => {
    const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`)
    return response.data
}

export const updatePet = async (petId: number, formData: FormData): Promise<ApiResponse<null>> => {
    const response = await instance.put<ApiResponse<null>>(`/api/pets/${petId}`, formData)
    return response.data
}

export const deletePet = async (petId: number): Promise<ApiResponse<null>> => {
    const response = await instance.delete<ApiResponse<null>>(`/api/pets/${petId}`)
    return response.data
}
