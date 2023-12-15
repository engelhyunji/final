import instance from '../../apis/instance'

export interface PetDetails {
    petId: number
    nickname: string
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrls: string
}

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

// Pet 상세 조회
export const fetchPetDetail = async (petId: string): Promise<PetDetails> => {
    try {
        const response = await instance.get<PetDetails>(`/api/pets/${petId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching pet details:', error)
        throw error
    }
}

