import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as ST from './style'
import { PetDetails, fetchPetDetail } from '../../../apis/api/pet'
import NoLineLink from '../../NoLineLink'

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
            <ST.DetailCard>
                {pet.imageUrls.slice(0, 1).map((url, index) => (
                    <ST.ImgCard key={index}>
                        <ST.Img2 src={url} alt={`${pet.petName} 이미지`} />
                    </ST.ImgCard>
                ))}
                <ST.Name>{pet.petName}</ST.Name>
                <ST.DetailText>
                    <ST.DetailLabel>성별: </ST.DetailLabel>
                    {pet.petGender === 'MALE' ? '남아' : '여아'}
                </ST.DetailText>
                <ST.DetailText>
                    <ST.DetailLabel>종류: </ST.DetailLabel>
                    {pet.petKind}
                </ST.DetailText>
                <ST.DetailText>
                    <ST.DetailLabel>Info: </ST.DetailLabel>
                    {pet.petInfo}
                </ST.DetailText>
                <ST.Wrap1>
                    <NoLineLink to={`/my`}>
                        <ST.Text1>마이 페이지로 이동 ⇀</ST.Text1>
                    </NoLineLink>
                </ST.Wrap1>
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
