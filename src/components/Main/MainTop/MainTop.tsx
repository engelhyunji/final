// Main Pet 조회
import React, { useState, useEffect } from 'react'
import * as ST from './style'
import { fetchPets, PetDetails } from '../../../apis/api/petlist'

const MainTop: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPetsData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetchPets()
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

        fetchPetsData()
    }, [])

    if (isLoading) {
        return <ST.TopContainer>로딩 중...</ST.TopContainer>
    }

    if (error) {
        return <ST.TopContainer>오류: {error}</ST.TopContainer>
    }

    return (
        <ST.TopContainer>
            <ST.Text>Pet</ST.Text>
            <ST.Content>
                {pets.slice(0, 6).map((pet) => (
                    <ST.Inside key={pet.petId}>
                        <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                    </ST.Inside>
                ))}
            </ST.Content>
        </ST.TopContainer>
    )
}

export default MainTop
