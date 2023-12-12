import instance from '../../apis/instance'

export interface PetDetails {
    petId: number
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrl: string
}

// Pet 상세 조회
export const fetchPetDetail = async (petId: number): Promise<PetDetails> => {
    const response = await instance.get<PetDetails>(`/pets/${petId}`)
    return response.data
}

// Pet 업데이트
export const updatePet = async (petId: number, formData: FormData): Promise<void> => {
    await instance.put(`/pets/${petId}`, formData)
}

// Pet 삭제
export const deletePet = async (petId: number): Promise<void> => {
    await instance.delete(`/pets/${petId}`)
}
