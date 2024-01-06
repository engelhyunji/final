import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import instance from '../../apis/instance'

interface PetDetails {
    petId: number
    nickname: string
    petName: string
    petGender: 'MALE' | 'FEMALE'
    petKind: 'SMALL' | 'MEDIUM' | 'LARGE'
    petInfo: string
    imageUrls: string[] // 배열 형태로 변경
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    const fetchPets = async () => {
        try {
            setIsLoading(true)
            setError(null)
            const response = await instance.get<{ message: string; data: PetDetails[] }>('/pets')

            if (response.status === 200) {
                setPets(response.data.data) // API 응답에서 data 필드를 사용합니다.
            } else {
                setError(`오류 발생: ${response.status}`)
            }
        } catch (error) {
            console.error('Error fetching pets:', error)
            setError('펫 목록을 불러오는 데 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPets() // 컴포넌트 마운트 시 자동으로 목록을 불러옵니다.
    }, [])

    const handleFetchPetsClick = () => {
        fetchPets() // 버튼 클릭 시 목록을 다시 불러옵니다.
    }

    if (isLoading) {
        return <div>로딩 중...</div>
    }

    if (error) {
        return <div>오류: {error}</div>
    }

    return (
        <div>
            <p>애완동물 목록</p>
            <button onClick={handleFetchPetsClick}>전체 조회</button>
            <p>로그인한 사용자: {nickname}</p>
            <div>
                {pets.map((pet) => (
                    <div key={pet.petId}>
                        {/* 이미지가 배열 형태로 저장되어 있다면, 첫 번째 이미지만 표시 */}
                        {pet.imageUrls && pet.imageUrls[0] && (
                            <img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                        )}
                        <div>
                            <p>
                                <label>애완동물 이름:</label> {pet.petName}
                            </p>
                            <p>
                                <label>애완동물 성별:</label> {pet.petGender === 'MALE' ? '남아' : '여아'}
                            </p>
                            <p>
                                <label>애완동물 종류:</label>{' '}
                                {pet.petKind === 'SMALL' ? '소형견' : pet.petKind === 'MEDIUM' ? '중형견' : '대형견'}
                            </p>
                            <p>
                                <label>애완동물 특이사항:</label> {pet.petInfo}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PetList
