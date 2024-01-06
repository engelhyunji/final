import React, { useState, useEffect } from 'react';
import * as ST from './style';
import { fetchPets, PetDetails } from '../../../apis/api/petlist';
import { useNavigate } from 'react-router-dom'; 

const MainTop: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetsData = async () => {
            setIsLoading(true);
            setError(null);
    
            try {
                const response = await fetchPets();
                if (response && response.isSuccess && response.result && Array.isArray(response.result.data)) {
                    setPets(response.result.data); // 데이터를 상태에 설정
                    console.log('mainpet', response.result.data);
                } else {
                    setError('펫 목록을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
                setError('API 호출에 실패했습니다.');
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchPetsData();
    }, []);
    

    useEffect(() => {
        console.log('Current Pet State:', pets); // 상태 업데이트 후 로그 출력
    }, [pets]);


    if (isLoading) {
        return <ST.TopContainer>로딩 중...</ST.TopContainer>;
    }

    if (error) {
        return <ST.TopContainer>오류: {error}</ST.TopContainer>;
    }

    return (
        <ST.TopContainer>
            <ST.Content>
                {pets.slice(0, 6).map((pet) => (
                    <ST.Inside key={pet.petId} onClick={() => navigate(`/pet/${pet.petId}`)}>
                        <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
                    </ST.Inside>
                ))}
            </ST.Content>
        </ST.TopContainer>
    );
};

export default MainTop;