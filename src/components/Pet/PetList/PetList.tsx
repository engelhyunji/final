import React, { useState, useEffect, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { fetchPetsWithCursor, likePet, unlikePet, PetDetails } from '../../../apis/api/petlist'
import * as ST from './style'

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    // const [nextCursor, setNextCursor] = useState<string | null>(null)
    const [likeMessage, setLikeMessage] = useState<string | null>(null)
    const [nextCursor, setNextCursor] = useState<string | undefined>(undefined)
    const [allDataLoaded, setAllDataLoaded] = useState(false) // 모든 데이터가 로드되었는지 여부를 추적

    const navigate = useNavigate()

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`)
    }

    const handleLikeClick = async (petId: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        try {
            const petIndex = pets.findIndex((pet) => pet.petId === petId)
            if (petIndex !== -1) {
                const updatedPet = { ...pets[petIndex] }
                if (updatedPet.petLikes > 0) {
                    await unlikePet(petId)
                    updatedPet.petLikes -= 1
                    setLikeMessage('좋아요가 취소되었습니다')
                } else {
                    await likePet(petId)
                    updatedPet.petLikes += 1
                    setLikeMessage('좋아요가 완료되었습니다')
                }
                setPets([...pets.slice(0, petIndex), updatedPet, ...pets.slice(petIndex + 1)])
            }
        } catch (error) {
            console.error('좋아요 처리 중 오류 발생:', error)
        }
    }

    const loadMorePets = useCallback(async () => {
        if (nextCursor !== undefined && !allDataLoaded) {
            setIsLoading(true)
            setError(null)
            try {
                const morePets = await fetchPetsWithCursor(nextCursor ?? undefined)
                if (morePets.length === 0) {
                    setAllDataLoaded(true) // 더 이상 로드할 데이터가 없음을 표시
                    setIsLoading(false)
                    return
                }

                // 새로 로드된 데이터를 기존 데이터에 추가
                setPets((prevPets) => [...prevPets, ...morePets])

                // 다음 커서 업데이트
                const newNextCursor = morePets[morePets.length - 1]?.petId.toString()
                setNextCursor(newNextCursor)
            } catch (error) {
                console.error('Error:', error)
                setError('Failed to load more pets.')
            } finally {
                setIsLoading(false)
            }
        }
    }, [nextCursor, allDataLoaded])

    // const fetchPetsData = async () => {
    //     setIsLoading(true)
    //     setError(null)
    //     try {
    //         const initialPets = await fetchPetsWithCursor()
    //         setPets(initialPets)
    //         setNextCursor(initialPets[initialPets.length - 1]?.petId.toString())
    //     } catch (error) {
    //         console.error('Error:', error)
    //         setError('API call failed.')
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const fetchPetsData = async () => {
        setIsLoading(true)
        setError(null)
        // try {
        //     const initialPets = await fetchPetsWithCursor()

        //     // 클라이언트 측에서 등록된 순서대로 정렬
        //     const sortedPets = initialPets.slice().sort((a, b) => {
        //         // a와 b의 등록 날짜를 비교하여 정렬
        //         return new Date(b.registration_date).getTime() - new Date(a.registration_date).getTime()
        //     })

        //     setPets(sortedPets)
        //     setNextCursor(sortedPets[sortedPets.length - 1]?.petId.toString())
        // } catch (error) {
        //     console.error('Error:', error)
        //     setError('API call failed.')
        // } finally {
        //     setIsLoading(false)
        // }
    }

    useEffect(() => {
        fetchPetsData()
    }, [])

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
    //             loadMorePets()
    //         }
    //     }
    //     window.addEventListener('scroll', handleScroll)
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //     }
    // }, [nextCursor])

    useEffect(() => {
        const handleScroll = () => {
            if (
                !allDataLoaded &&
                window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
            ) {
                loadMorePets()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [loadMorePets, allDataLoaded])

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

            {/* <ST.PetSearchContainer>
                <ST.PetSearchCondition>애견 이름</ST.PetSearchCondition>
                <ST.PetSearchInput type="text" value={''} placeholder="강아지 이름을 입력해서 찾아보세요" readOnly />
                <ST.SearchBtn>검색</ST.SearchBtn>
            </ST.PetSearchContainer> */}

            <ST.PetSearchContainer>
                <ST.PetSearchCondition>스크롤을 내려서 전체 강아지를 조회해보세요</ST.PetSearchCondition>
            </ST.PetSearchContainer>

            <ST.PetListContainer>{/* <ST.PetListH3>Pet 조회</ST.PetListH3> */}</ST.PetListContainer>
            {/* <ST.Posts>
                {pets.map((pet) => (
                    <ST.PostContainer key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
                        {pet.imageUrls && pet.imageUrls[0] && (
                            <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                        )}
                        <ST.LikeButton onClick={(e) => handleLikeClick(pet.petId, e)}>
                            {pet.petLikes > 0 ? '♥' : '♡'}
                        </ST.LikeButton>
                        {likeMessage && <div>{likeMessage}</div>}
                    </ST.PostContainer>
                ))}
            </ST.Posts> */}
            <ST.Posts>
                {pets.map((pet, index) => (
                    <ST.PostContainer key={pet.petId + '-' + index} onClick={() => handlePetClick(pet.petId)}>
                        {pet.imageUrls && pet.imageUrls[0] && (
                            <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                        )}
                        <ST.LikeButton onClick={(e) => handleLikeClick(pet.petId, e)}>
                            {pet.petLikes > 0 ? '♥' : '♡'}
                        </ST.LikeButton>
                        {likeMessage && <div>{likeMessage}</div>}
                    </ST.PostContainer>
                ))}
            </ST.Posts>
        </ST.Container>
    )
}

export default PetList
