import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useParams } from 'react-router-dom'
import { fetchPetDetail, PetDetails } from '../../../apis/api/petlist'
import * as ST from './style'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const PetDetail: React.FC = () => {
    const [pet, setPet] = useState<PetDetails | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { petId } = useParams<{ petId: string }>()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageUrl, setCurrentImageUrl] = useState('')

    const openModal = (imageUrl: string) => {
        setCurrentImageUrl(imageUrl)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    // useEffect(() => {
    //     const fetchPetData = async () => {
    //         setIsLoading(true)
    //         setError(null)

    //         try {
    //             if (petId) {
    //                 const response = await fetchPetDetail(petId)
    //                 console.log('API Response:', response) // API 전체 응답 로그 출력
    //                 if (response && response.isSuccess) {
    //                     if (response.result) {
    //                         setPet(response.result) // 데이터를 상태에 설정
    //                         console.log('Fetched Pet Data:', response.result) // API 응답 로그
    //                     } else {
    //                         console.log('No pet data in response')
    //                         setError('Pet data not found in response.')
    //                     }
    //                 } else {
    //                     setError('Pet.')
    //                 }
    //             } else {
    //                 setError('Pet ID.')
    //             }
    //         } catch (error) {
    //             console.error('Error :', error)
    //             setError('API.')
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }

    //     if (petId) {
    //         fetchPetData()
    //     }
    // }, [petId])

    // useEffect(() => {
    //     const fetchPetData = async () => {
    //         setIsLoading(true);
    //         setError(null);

    //         try {
    //             if (petId) {
    //                 const response = await fetchPetDetail(petId);
    //                 console.log('API Response:', response);
    //                 if (response && response.isSuccess) {
    //                     if (response.result) {
    //                         setPet(response.result); // 이 부분을 수정합니다.
    //                         console.log('Fetched Pet Data:', response.result);
    //                     } else {
    //                         console.log('No pet data in response');
    //                         setError('Pet data not found in response.');
    //                     }
    //                 } else {
    //                     setError('Error fetching pet data.');
    //                 }
    //             } else {
    //                 setError('Pet ID is missing.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching pet data:', error);
    //             setError('Error fetching pet data from API.');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     if (petId) {
    //         fetchPetData();
    //     }
    // }, [petId]);

    useEffect(() => {
        const fetchPetData = async () => {
            setIsLoading(true);
            setError(null);
    
            try {
                if (petId) {
                    const response = await fetchPetDetail(petId);
                    console.log('API Response:', response);
                    if (response && response.isSuccess) {
                        setPet(response.result.data);
                        // setPet(response.result);
                        console.log('Fetched Pet Data:', response.result.data);
                    } else {
                        console.log('No pet data in response');
                        setError('Pet data not found in response.');
                    }
                } else {
                    setError('Pet ID is missing.');
                }
            } catch (error) {
                console.error('Error fetching pet data:', error);
                setError('Error fetching pet data from API.');
            } finally {
                setIsLoading(false);
            }
        };
    
        if (petId) {
            fetchPetData();
        }
    }, [petId]);
    

    useEffect(() => {
        console.log('Current Pet State:', pet) // 상태 업데이트 후 로그 출력
    }, [pet])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!pet) {
        return <div>..</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <ST.ProfileContainer>
            <ST.DetailCard>
                {pet.imageUrls.slice(0, 1).map((url, index) => (
                    <ST.ImgCard key={index}>
                        <ST.Img2 src={url} alt={`${pet.petName} 이미지`} />
                    </ST.ImgCard>
                ))}

                <ST.TextContainer>
                    <ST.Name>{pet.petName}</ST.Name>
                    <ST.DetailText>
                        <ST.DetailLabel>특징 - </ST.DetailLabel>
                        <ST.H3>{pet.petInfo}</ST.H3>
                    </ST.DetailText>
                    <ST.DetailText>
                        <ST.DetailLabel>크기 - </ST.DetailLabel>
                        <ST.H3>{pet.petKind}</ST.H3>
                    </ST.DetailText>
                    <ST.DetailText>
                        <ST.DetailLabel>성별 - </ST.DetailLabel>
                        <ST.H3>{pet.petGender === 'MALE' ? '남아' : '여아'}</ST.H3>
                    </ST.DetailText>
                </ST.TextContainer>
                {/* <ST.Wrap1>
                <NoLineLink to={`/my`}>
                    <ST.Text1>마이 페이지로 이동 ⇀</ST.Text1>
                </NoLineLink>
            </ST.Wrap1> */}
            </ST.DetailCard>
            <ST.Posts>
                {pet.imageUrls.map((url, index) => (
                    <ST.ImgCard1 key={index} onClick={() => openModal(url)}>
                        <ST.Img src={url} alt={`${pet.petName} 이미지`} />
                    </ST.ImgCard1>
                ))}
            </ST.Posts>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        inset: '50px',
                        border: 'none',
                        background: 'none',
                        padding: '0',
                        overflow: 'visible',
                    },
                }}
            >
                <ST.ModalContent>
                    <ST.ModalImage src={currentImageUrl} alt="Pet" />
                    <ST.CloseButton onClick={closeModal}>×</ST.CloseButton>
                </ST.ModalContent>
            </Modal>
        </ST.ProfileContainer>
    )
}

export default PetDetail
