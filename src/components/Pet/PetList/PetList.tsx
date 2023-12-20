import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { fetchPets } from '../../../apis/api/petlist'
import { PetDetails } from '../../../apis/api/petlist'
// import { useAuth } from '../../../context/AuthContext'
import * as ST from './style'

const PetList: React.FC = () => {
    // const { nickname } = useAuth() // useAuth 훅을 사용하여 nickname 가져오기
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

        const result = await fetchPets()

        if (result) {
            setPets(result.data || [])
        } else {
            setError('펫 목록을 불러오는 데 실패했습니다.')
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
            <ST.Wrap>
                <ST.ProfileContainer>
                    <ST.Name>애완동물 전체 목록</ST.Name>
                    {/* <p>로그인한 사용자: {nickname}</p> */}
                    <ST.Button onClick={handleFetchPetsClick}>전체 조회</ST.Button>
                    <ST.Posts>
                        <ST.ImgCard>
                            {pets.map((pet) => (
                                <ST.PetItem key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                                    {/* 이미지가 배열 형태로 저장되어 있다면, 첫 번째 이미지만 표시 */}
                                    {pet.imageUrls && pet.imageUrls[0] && (
                                        <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                                    )}
                                    {/* <ST.Content> */}
                                    <ST.Text>
                                        <label>애완동물 이름:</label> {pet.petName}
                                    </ST.Text>
                                    {/* <ST.Text>
                                            <label>애완동물 성별:</label> {pet.petGender === 'MALE' ? '남아' : '여아'}
                                        </ST.Text> */}
                                    {/* <ST.Text>
                                            <label>애완동물 종류:</label>{' '}
                                            {pet.petKind === 'SMALL'
                                                ? '소형견'
                                                : pet.petKind === 'MEDIUM'
                                                  ? '중형견'
                                                  : '대형견'}
                                        </ST.Text> */}
                                    {/* <ST.Text>
                                            <label>애완동물 특이사항:</label> {pet.petInfo}
                                        </ST.Text> */}
                                    {/* </ST.Content> */}
                                </ST.PetItem>
                            ))}
                        </ST.ImgCard>
                    </ST.Posts>
                </ST.ProfileContainer>
            </ST.Wrap>
        </ST.Back>
    )
}

export default PetList
