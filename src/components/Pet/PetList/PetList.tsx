import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import * as ST from './style'
import instance from '../../../apis/instance'
import Pagination from 'react-bootstrap/Pagination'
import './Pagination.css'

export interface PetDetails {
    userId: number
    petId: number
    nickname: string
    petName: string
    petGender: string
    petKind: string
    petInfo: string
    imageUrls: string[]
    petLikes: number
}

export interface ApiResponse {
    isSuccess: boolean
    code: number
    message: string
    result: PetDetails[]
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [petsPerPage] = useState<number>(16)
    const [isSortedByNewest, setIsSortedByNewest] = useState(false)

    const sortPetsByNewest = (pets: PetDetails[]): PetDetails[] => {
        return [...pets].sort((a, b) => b.petId - a.petId)
    }

    const handleSortNewest = () => {
        if (!isSortedByNewest) {
            const sortedPets = sortPetsByNewest(pets)
            setPets(sortedPets)
        } else {
            fetchPets()
        }
        setIsSortedByNewest(!isSortedByNewest)
    }

    const navigate = useNavigate()

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`)
    }

    const fetchPets = async () => {
        setError(null)

        try {
            const response = await instance.get<ApiResponse>('/api/pets')
            if (response.data.isSuccess) {
                setPets(response.data.result)
            } else {
                throw new Error(`오류 발생: ${response.data.message}`)
            }
        } catch (error) {
            console.error('에러:', error)
            setError('펫 목록을 불러오는 데 실패했습니다.')
        }
    }

    useEffect(() => {
        fetchPets()
    }, [])

    const indexOfLastPet = currentPage * petsPerPage
    const indexOfFirstPet = indexOfLastPet - petsPerPage
    const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet)

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        if (isSortedByNewest) {
            setPets(sortPetsByNewest(pets))
        }
    }, [isSortedByNewest, pets])

    if (error) {
        return <div>오류: {error}</div>
    }

    return (
        <ST.Container>
            <ST.ProfileContainer>
                <ST.TitleBackContainer>
                    <ST.PetListH2>반려동물</ST.PetListH2>
                    <ST.PetP>우리 강아지 귀여운 거 나만 볼 수 없을 땐? 요기에 자랑하기!</ST.PetP>
                    <ST.Button onClick={handleSortNewest}>
                        {isSortedByNewest ? '기본순으로 보기' : '최신순으로 보기'}
                    </ST.Button>
                </ST.TitleBackContainer>
            </ST.ProfileContainer>

            <ST.Posts>
                {currentPets.map((pet) => (
                    <ST.PostContainer key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                        {pet.imageUrls && pet.imageUrls[0] && (
                            <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                        )}
                        {/* <ST.LikeButton
                            onClick={(e) => {
                                e.stopPropagation()
                                pet.petLikes > 0 ? removeLike(pet.petId) : addLike(pet.petId)
                            }}
                        >
                            {pet.petLikes > 0 ? `♡` : `♥`}
                        </ST.LikeButton> */}
                    </ST.PostContainer>
                ))}
            </ST.Posts>
            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: Math.ceil(pets.length / 16) }, (_, index) => (
                    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === Math.ceil(pets.length / 12)}
                />
            </Pagination>
        </ST.Container>
    )
}

export default PetList
