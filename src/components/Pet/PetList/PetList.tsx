import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { fetchPetsWithCursor, PetDetails } from '../../../apis/api/petlist'
import * as ST from './style'

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`)
    }

    const fetchPetsData = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const initialPets = await fetchPetsWithCursor()
            setPets(initialPets)
        } catch (error) {
            console.error('Error:', error)
            setError('API call failed.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPetsData()
    }, [])

    if (isLoading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>오류: {error}</div>
    }

    return (
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
                    </ST.PostContainer>
                ))}
            </ST.Posts>
        </ST.Container>
    )
}

export default PetList
