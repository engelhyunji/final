// import React, { useState, useEffect } from 'react'
// import * as ST from './style'
// import { fetchPets, PetDetails } from '../../../apis/api/petlist' // 필요한 API 호출 함수 및 타입 가져오기

// const MainTop: React.FC = () => {
//     const [pets, setPets] = useState<PetDetails[]>([]) // 펫 목록을 저장할 상태
//     const [isLoading, setIsLoading] = useState(true) // 로딩 상태
//     const [error, setError] = useState<string | null>(null) // 에러 상태

//     useEffect(() => {
//         const fetchPetsData = async () => {
//             setIsLoading(true)
//             setError(null)

//             try {
//                 const response = await fetchPets()
//                 if (response && response.result) {
//                     setPets(response.result)
//                     console.log('Pet', response.result)
//                 } else {
//                     setError(response ? response.message : '펫 목록을 불러오는 데 실패했습니다.')
//                 }
//             } catch (error) {
//                 console.error('API 호출 중 오류 발생:', error)
//                 setError('API 호출에 실패했습니다.')
//             }

//             setIsLoading(false)
//         }

//         fetchPetsData()
//     }, [])

//     if (isLoading) {
//         return <ST.TopContainer>로딩 중...</ST.TopContainer>
//     }

//     if (error) {
//         return <ST.TopContainer>오류: {error}</ST.TopContainer>
//     }

//     return (
//         <ST.TopContainer>
//             {/* <ST.Text>Pet</ST.Text> */}
//             <ST.Content>
//                 {pets.slice(0, 6).map(
//                     (
//                         pet, // 첫 6개 항목만 추출
//                     ) => (
//                         <ST.Inside key={pet.petId}>
//                             <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} 이미지`} />
//                         </ST.Inside>
//                     ),
//                 )}
//             </ST.Content>
//             {/*  */}
//         </ST.TopContainer>
//     )
// }

// export default MainTop


// MainTop.tsx

import React, { useState, useEffect } from 'react';
import * as ST from './style';
import { useNavigate } from 'react-router-dom';
import instance from '../../../apis/instance'; // instance import 추가

export interface PetDetails {
    userId: number;
    petId: number;
    nickname: string;
    petName: string;
    petGender: string;
    petKind: string;
    petInfo: string;
    imageUrls: string[];
    petLikes: number;
}

export interface ApiResponse {
    isSuccess: boolean;
    code: number;
    message: string;
    result: PetDetails[];
}

const MainTop: React.FC = () => {
    const [pets, setPets] = useState<PetDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            setIsLoading(true);
            setError(null);
    
            try {
                const response = await instance.get<ApiResponse>('/api/pets');
                if (response.data.isSuccess) {
                    setPets(response.data.result);
                } else {
                    throw new Error(`Error: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to load pets.');
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchPets();
    }, []);

    if (isLoading) {
        return <ST.TopContainer>Loading...</ST.TopContainer>;
    }

    if (error) {
        return <ST.TopContainer>Error: {error}</ST.TopContainer>;
    }

    if (pets.length === 0) {
        return <ST.TopContainer>No pets registered.</ST.TopContainer>;
    }

    return (
        <ST.TopContainer>
            <ST.Content>
                {pets.slice(0, 6).map((pet) => (
                    <ST.Inside key={pet.petId} onClick={() => navigate(`/pet/${pet.petId}`)}>
                        {pet.imageUrls && pet.imageUrls.length > 0 && (
                            <ST.Img src={pet.imageUrls[0]} alt={`${pet.petName} image`} />
                        )}
                    </ST.Inside>
                ))}
            </ST.Content>
        </ST.TopContainer>
    );
};

export default MainTop;
