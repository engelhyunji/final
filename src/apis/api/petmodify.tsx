import instance from '../../apis/instance'

export interface PetDetails {
    petId: number
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrls: string
}

export interface ApiResponse<T> {
    isSuccess: boolean
    message: string
    result: T
}

export interface PetFormState {
    petName: string
    petGender: string
    petKind: string
    petInfo: string
}

export const initialFormState: PetFormState = {
    petName: '',
    petGender: '',
    petKind: '',
    petInfo: '',
}

export interface ApiResponseError {
    message: string
}

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
