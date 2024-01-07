import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ST from './style'
import { useParams } from 'react-router-dom'
import instance from '../../../apis/instance'

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

export interface ApiResponse<T> {
    isSuccess: boolean
    code: number
    message: string
    result: T
}

const PetDetail: React.FC = () => {
    const [pet, setPet] = useState<PetDetails | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { petId } = useParams<{ petId: string }>()

    const fetchPetDetail = async (petId: string): Promise<ApiResponse<PetDetails> | null> => {
        try {
            const response = await instance.get<ApiResponse<PetDetails>>(`/api/pets/${petId}`)
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

    useEffect(() => {
        const fetchPetData = async () => {
            setError(null)

            try {
                if (petId) {
                    const response = await fetchPetDetail(petId)
                    if (response && response.isSuccess) {
                        setPet(response.result)
                    } else {
                        setError('에러')
                    }
                } else {
                    setError('Pet ID.')
                }
            } catch (error) {
                console.error('에러', error)
                setError('에러')
            }
        }

        if (petId) {
            fetchPetData()
        }
    }, [petId])

    if (!pet) {
        return <div></div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <ST.ProfileContainer>
            <ST.DetailCard>
                {pet.imageUrls.slice(0, 1).map((url, index) => (
                    <ST.ImgCard key={index}>
                        <ST.Img2 src={url} alt={`${pet.petName} 이미지`} />
                    </ST.ImgCard>
                ))}
                <ST.TextContainer>
                    <ST.Name>{pet.petName}</ST.Name> 
                    <ST.TextContainer2>
                        <ST.TextContainer3>
                            <ST.DetailLabel>특징 </ST.DetailLabel> 
                            <ST.H3>{pet.petInfo}</ST.H3> 
                            <ST.DetailLabel>크기 </ST.DetailLabel> 
                            <ST.H3>{pet.petKind}</ST.H3> 
                            <br />
                            <ST.DetailLabel>성별 </ST.DetailLabel> 
                            <ST.H3>{pet.petGender}</ST.H3> 
                        </ST.TextContainer3>
                    </ST.TextContainer2>
                </ST.TextContainer>
            </ST.DetailCard>
            <ST.Posts>
                {pet.imageUrls.map((url, index) => (
                    <ST.ImgCard1 key={index}>
                        <ST.Img src={url} alt={`${pet.petName} 이미지`} /> 
                    </ST.ImgCard1>
                ))}
            </ST.Posts>
        </ST.ProfileContainer>
    )
}

export default PetDetail
