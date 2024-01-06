import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import * as ST from './style'
import instance from '../../../apis/instance'

export interface PetDetails {
    userId: number
    petId: number
    nickname: string
    petName: string
    petGender: string
    petKind: string
    petInfo: string
    imageUrls: string[]
    petLikes: number
}

export interface ApiResponse {
    isSuccess: boolean
    code: number
    message: string
    result: PetDetails[]
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`)
    }

    // 좋아요 추가 함수
    const addLike = async (petId: number) => {
        try {
            await instance.post(`/api/pets/${petId}/like`)
            setPets((currentPets) =>
                currentPets.map((pet) => (pet.petId === petId ? { ...pet, petLikes: pet.petLikes + 1 } : pet)),
            )
        } catch (error) {
            console.error('좋아요 추가 중 에러 발생:', error)
        }
    }

    // 좋아요 취소 함수
    const removeLike = async (petId: number) => {
        try {
            await instance.delete(`/api/pets/${petId}/unlike`)
            setPets((currentPets) =>
                currentPets.map((pet) => (pet.petId === petId ? { ...pet, petLikes: pet.petLikes - 1 } : pet)),
            )
        } catch (error) {
            console.error('좋아요 취소 중 에러 발생:', error)
        }
    }

    const fetchPets = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await instance.get<ApiResponse>('/api/pets')
            console.log(response)
            if (response.data.isSuccess) {
                setPets(response.data.result)
            } else {
                throw new Error(`오류 발생: ${response.data.message}`)
            }
        } catch (error) {
            console.error('에러:', error)
            setError('펫 목록을 불러오는 데 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPets()
    }, [])

    if (isLoading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>오류: {error}</div>
    }

    if (pets.length === 0) {
        return <div>등록된 애완동물이 없습니다.</div>
    }

    return (
        // <ST.Container>
        //     <ST.Posts>
        //         {pets.map((pet) => (
        //             <ST.PostContainer key={pet.petId}>
        //                 {pet.imageUrls && pet.imageUrls.length > 0 && (
        //                     <ST.Img
        //                         src={pet.imageUrls[0]}
        //                         alt={`${pet.petName} 이미지`}
        //                         onClick={() => handlePetClick(pet.petId)}
        //                     />
        //                 )}
        //                 <button onClick={() => addLike(pet.petId)}>좋아요 ({pet.petLikes})</button>
        //                 <button onClick={() => removeLike(pet.petId)}>좋아요 취소</button>
        //             </ST.PostContainer>
        //         ))}
        //     </ST.Posts>
        // </ST.Container>
        <ST.Container>
        <ST.ProfileContainer>
            <ST.TitleBackContainer>
                <ST.PetListH2>강아지</ST.PetListH2>
                <ST.PetP>우리 강아지 귀여운 거 나만 볼 수 없을 땐? 요기에 자랑하기!</ST.PetP>
            </ST.TitleBackContainer>
        </ST.ProfileContainer>

        <ST.Posts>
            {pets.map((pet) => (
                <ST.PostContainer key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                    {pet.imageUrls && pet.imageUrls[0] && (
                        <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                    )}
                    <button onClick={() => addLike(pet.petId)}>좋아요 ({pet.petLikes})</button>
                    <button onClick={() => removeLike(pet.petId)}>좋아요 취소</button>
                </ST.PostContainer>
            ))}
        </ST.Posts>
    </ST.Container>
    )
}

export default PetList
