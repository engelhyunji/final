import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as ST from './style'
import { PetDetails, fetchPetDetail } from '../../../apis/api/pet'

type PetDetailParams = {
    [key: string]: string | undefined // petId가 undefined일 수 있음을 명시
}

const PetDetail: React.FC = () => {
    const [pet, setPet] = useState<PetDetails | null>(null)
    const { petId } = useParams<PetDetailParams>()

    useEffect(() => {
        const loadPetDetail = async () => {
            if (petId) {
                try {
                    const response = await fetchPetDetail(petId)
                    if (response && response.isSuccess) {
                        setPet(response.result)
                    } else {
                        console.error('Error:', response?.message)
                    }
                } catch (error) {
                    console.error('Error:', error)
                }
            }
        }

        loadPetDetail()
    }, [petId])

    if (!pet) {
        return <div>Loading...</div>
    }

    return (
        <ST.ProfileContainer>
            <ST.Wrap>
                <ST.Posts>
                    <ST.Name>{pet.petName} 상세 정보</ST.Name>
                    <ST.ImgCard>
                        <ST.PetItem>
                            <ST.Img>
                                {pet.imageUrls && pet.imageUrls[0] && (
                                    <img
                                        src={pet.imageUrls[0]}
                                        alt={`${pet.petName} 이미지`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            borderRadius: '10px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                            </ST.Img>
                        </ST.PetItem>
                    </ST.ImgCard>

                    <ST.Text>
                        <p>
                            <ST.DetailLabel>애완동물 성별:</ST.DetailLabel> {pet.petGender === 'MALE' ? '남아' : '여아'}
                        </p>
                        <p>
                            <ST.DetailLabel>애완동물 종류:</ST.DetailLabel>
                            {pet.petKind === 'SMALL' ? '소형견' : pet.petKind === 'MEDIUM' ? '중형견' : '대형견'}
                        </p>
                        <p>
                            <ST.DetailLabel>Info:</ST.DetailLabel> {pet.petInfo}
                        </p>

                        <p>
                            <Link to={`/modify/${pet.petId}`}>수정 페이지로 이동</Link>
                        </p>
                    </ST.Text>
                </ST.Posts>
            </ST.Wrap>
        </ST.ProfileContainer>
    )
}

export default PetDetail
