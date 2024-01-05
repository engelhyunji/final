
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
}

// ApiResponse 타입 정의
export interface ApiResponse<T> {
    isSuccess: boolean;
    code: number;
    message: string;
    result: T;
}
