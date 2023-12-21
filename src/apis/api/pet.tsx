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

export interface ApiResponse<T> {
    isSuccess: boolean;
    result: T;
    message: string;
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
export const fetchPetDetail = async (petId: string): Promise<ApiResponse<PetDetails> | null> => {
    try {
        const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`오류 발생: ${response.status}`);
        }
    } catch (error) {
        console.error('에러:', error);
        return null;
    }
};