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

    const translatePetGender = (gender: 'MALE' | 'FEMALE') => {
        switch (gender) {
            case 'MALE':
                return '남아'
            case 'FEMALE':
                return '여아'
            default:
                return gender
        }
    }

    const translatePetKind = (kind: 'SMALL' | 'MEDIUM' | 'LARGE') => {
        switch (kind) {
            case 'SMALL':
                return '소형견'
            case 'MEDIUM':
                return '중형견'
            case 'LARGE':
                return '대형견'
            default:
                return kind
        }
    }

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
            <ST.DetailCard />
            <ST.ImageContainer>
                {pet.imageUrls.slice(0, 1).map((url, index) => (
                    <ST.Img2 key={index} src={url} alt={`${pet.petName} 이미지`} />
                ))}
            </ST.ImageContainer>

            <ST.TextContainer>
                <ST.MultiLineText>
                    <ST.Name>{pet.petName}</ST.Name>
                    <ST.TextContent>
                        <ST.DetailLabel>특징</ST.DetailLabel>
                        <ST.TextLabel>{pet.petInfo}</ST.TextLabel>
                    </ST.TextContent>
                    <ST.TextContent>
                        <ST.DetailLabel1>성별</ST.DetailLabel1>
                        <ST.TextLabel1>{translatePetGender(pet.petGender)}</ST.TextLabel1>
                    </ST.TextContent>
                    <ST.TextContent>
                        <ST.DetailLabel>크기</ST.DetailLabel>
                        <ST.TextLabel>{translatePetKind(pet.petKind)}</ST.TextLabel>
                    </ST.TextContent>
                </ST.MultiLineText>
            </ST.TextContainer>
            {/* <ST.Posts>
                {pet.imageUrls.map((url, index) => (
                    <ST.ImgCard1 key={index}>
                        <ST.Img src={url} alt={`${pet.petName} 이미지`} />
                    </ST.ImgCard1>
                ))}
            </ST.Posts> */}
        </ST.ProfileContainer>
    )
}

export default PetDetail
