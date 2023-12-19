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

// Pet 조회
export const fetchPets = async (): Promise<{ message: string; data: PetDetails[] } | null> => {
    try {
        const response = await instance.get<{ message: string; data: PetDetails[] }>('/api/pets')

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
