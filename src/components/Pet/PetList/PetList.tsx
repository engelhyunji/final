import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { fetchPets } from '../../../apis/api/petlist'
import { PetDetails } from '../../../apis/api/petlist'
import * as ST from './style'

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate()

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`) // 해당 펫의 상세 페이지로 이동
    }

    const fetchPetsData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetchPets()
            console.log(response)

            if (response && response.result) {
                setPets(response.result)
            } else {
                setError(response ? response.message : '펫 목록을 불러오는 데 실패했습니다.')
            }
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error)
            setError('API 호출에 실패했습니다.')
        }

        setIsLoading(false)
    }

    useEffect(() => {
        fetchPetsData() // 컴포넌트 마운트 시 자동으로 목록을 불러옵니다.
    }, [])

    const handleFetchPetsClick = () => {
        fetchPetsData() // 버튼 클릭 시 목록을 다시 불러옵니다.
    }

    if (isLoading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>오류: {error}</div>
    }

    return (
        <ST.Back>
            <ST.ProfileContainer>
                <ST.Name>애완동물 전체 목록</ST.Name>
                <ST.Button onClick={handleFetchPetsClick}>전체 조회</ST.Button>
                <ST.Posts>
                    {pets.map((pet) => (
                        <ST.PostContainer key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                            {pet.imageUrls && pet.imageUrls[0] && (
                                <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                            )}
                        </ST.PostContainer>
                    ))}
                </ST.Posts>
            </ST.ProfileContainer>
        </ST.Back>
    )
}

export default PetList
