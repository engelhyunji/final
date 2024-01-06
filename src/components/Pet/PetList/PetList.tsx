import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { ApiResponse } from '../../../apis/api/petlist'
import { PetDetails } from '../../../apis/api/petlist'
import * as ST from './style'
import instance from '../../../apis/instance'

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`);
    }

    const fetchPets = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await instance.get<ApiResponse<{ data: PetDetails[] }>>('/api/pets');
            if (response.data.isSuccess && response.data.result.data) {
                setPets(response.data.result.data); // API 응답 구조에 맞게 상태 업데이트
            } else {
                throw new Error(`오류 발생: ${response.data.message}`);
            }
        } catch (error) {
            console.error('에러:', error);
            setError('펫 목록을 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }
    return (
        <ST.Container>
            <ST.ProfileContainer>
                <ST.TitleBackContainer>
                <ST.PetListH2>Pet</ST.PetListH2>
                    <ST.PetP>우리 애기 귀여운 거 나만 볼 수 없을 땐? 마이펫에 자랑하기!</ST.PetP>
                </ST.TitleBackContainer>
            </ST.ProfileContainer>
            {/* <ST.PetSearchContainer>
                <ST.PetSearchCondition>애견 이름</ST.PetSearchCondition>
                <ST.PetSearchInput
                    type="text"
                    value={'검색기능 준비중입니다'}
                    placeholder="검색기능 준비중입니다"
                    readOnly // 검색 기능이 준비 중이므로 입력을 방지합니다.
                    />
                <ST.SearchBtn>검색</ST.SearchBtn>
            </ST.PetSearchContainer> */}
            <ST.PetListContainer>
                <ST.PetListH3>Pet 조회</ST.PetListH3>
            </ST.PetListContainer>
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