import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'
import * as ST from './style'
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

// ApiResponse 타입 정의
export interface ApiResponse<T> {
    isSuccess: boolean
    code: number
    message: string
    result: T
}

const PetDetail: React.FC = () => {
    const [pet, setPet] = useState<PetDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
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
            setIsLoading(true)
            setError(null)

            try {
                if (petId) {
                    const response = await fetchPetDetail(petId)
                    if (response && response.isSuccess) {
                        setPet(response.result)
                    } else {
                        setError('Pet data not found in response.')
                    }
                } else {
                    setError('Pet ID is missing.')
                }
            } catch (error) {
                console.error('Error fetching pet data:', error)
                setError('Error fetching pet data from API.')
            } finally {
                setIsLoading(false)
            }
        }

        if (petId) {
            fetchPetData()
        }
    }, [petId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!pet) {
        return <div>No pet data available.</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="profile-container"> {/* ST.ProfileContainer 대체 */}
            <div className="detail-card"> {/* ST.DetailCard 대체 */}
                {pet.imageUrls.slice(0, 1).map((url, index) => (
                    <div className="img-card" key={index}> {/* ST.ImgCard 대체 */}
                        <img src={url} alt={`${pet.petName} 이미지`} /> {/* ST.Img2 대체 */}
                    </div>
                ))}

                <div className="text-container"> {/* ST.TextContainer 대체 */}
                    <h1>{pet.petName}</h1> {/* ST.Name 대체, h1 또는 h2 사용 */}
                    <div className="detail-text"> {/* ST.DetailText 대체 */}
                        <span>특징 - </span> {/* ST.DetailLabel 대체 */}
                        <h3>{pet.petInfo}</h3> {/* ST.H3 대체 */}
                    </div>
                    <div className="detail-text">
                        <span>크기 - </span>
                        <h3>{pet.petKind}</h3>
                    </div>
                    <div className="detail-text">
                        <span>성별 - </span>
                        <h3>{pet.petGender === 'MALE' ? '남아' : '여아'}</h3>
                    </div>
                </div>
            </div>

            <div className="posts"> {/* ST.Posts 대체 */}
                {pet.imageUrls.map((url, index) => (
                    <div className="img-card-1" key={index}> {/* ST.ImgCard1 대체 */}
                        <img src={url} alt={`${pet.petName} 이미지`} /> {/* ST.Img 대체 */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PetDetail
