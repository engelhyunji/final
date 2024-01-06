import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { fetchPets } from '../../../apis/api/petlist'; // fetchPets 함수 추가
import { PetDetails } from '../../../apis/api/pet';

const PetList: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handlePetClick = (petId: number) => {
        navigate(`/pet/${petId}`);
    }

    const fetchPetsData = async () => {
    setIsLoading(true);
    setError(null);

    const result = await fetchPets();

    if (result && result.isSuccess) {
        setPets(result.result);
    } else {
        setError('펫 목록을 불러오는 데 실패했습니다.');
    }

    setIsLoading(false);
}


    useEffect(() => {
        fetchPetsData();
    }, []);

    const handleFetchPetsClick = () => {
        fetchPetsData();
    }

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류: {error}</div>;
    }

    return (
        <div>
            <p>애완동물 목록</p>
            <button onClick={handleFetchPetsClick}>전체 조회</button>
            <div>
                {pets.map((pet) => (
                    <div key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
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

export default PetList;
