import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom' // Removed unused import
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
                // petId가 undefined가 아닌 경우에만 fetchPetDetail 호출
                try {
                    const petDetails = await fetchPetDetail(petId)
                    setPet(petDetails)
                } catch (error) {
                    console.error('에러:', error)
                }
            }
        }

        loadPetDetail()
    }, [petId])

    if (!pet) {
        return <div>Loading...</div>
    }

    return (
        <ST.Content>
            <ST.Text>{pet.petName} 상세 정보</ST.Text>
            <div>
                {pet.imageUrls && pet.imageUrls[0] && <img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />}
            </div>
            <div>
                <p>
                    <Link to={`/modify/${pet.petId}`}>수정 페이지로 이동</Link>
                </p>
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
            </div>
        </ST.Content>
    )
}

export default PetDetail
