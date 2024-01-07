import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PetDetails, fetchPetDetail, updatePet, deletePet } from '../../../apis/api/petmodify'
import * as ST from './style'
import BackWave from '../../BackWave'
import Dropdown from 'react-bootstrap/Dropdown'

const PetModify: React.FC = () => {
    const [petDetail, setPetDetail] = useState<PetDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const { petId } = useParams<{ petId: string }>()

    const [petNameError, setPetNameError] = useState<string | null>(null)
    const [petInfoError, setPetInfoError] = useState<string | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (petId) {
            fetchPetDetail(parseInt(petId))
                .then((response) => {
                    if (response.isSuccess) {
                        setPetDetail(response.result)
                    } else {
                        setError(response.message)
                    }
                    setLoading(false)
                })
                .catch(() => {
                    setError('펫 정보를 불러오는데 실패했습니다.')
                    setLoading(false)
                })
        }
    }, [petId])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        if (name === 'petName' && value.length > 10) {
            setPetNameError('펫 이름은 10글자 이내로 입력해주세요.')
        } else {
            setPetNameError(null)
        }

        if (name === 'petInfo' && value.length > 50) {
            setPetInfoError('펫 정보는 50글자 이내로 입력해주세요.')
        } else {
            setPetInfoError(null)
        }

        if (petDetail) {
            setPetDetail({ ...petDetail, [name]: value })
        }
    }

    const handleKindChange = (kind: 'SMALL' | 'MEDIUM' | 'LARGE') => {
        // 타입을 구체적으로 지정
        if (petDetail) {
            setPetDetail({ ...petDetail, petKind: kind })
        }
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => setImagePreviewUrl(reader.result as string)
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!petDetail || !petDetail.petName || !petDetail.petGender || !petDetail.petKind || !petDetail.petInfo) {
            setError('모든 필드를 채워주시길 바랍니다.')
            return
        }

        if (petNameError || petInfoError) {
            alert('글자수 제한 조건을 맞춰서 입력해주세요.')
            return
        }

        const formData = new FormData()
        formData.append('petName', petDetail.petName)
        formData.append('petGender', petDetail.petGender)
        formData.append('petKind', petDetail.petKind)
        formData.append('petInfo', petDetail.petInfo)

        if (imageUrl) {
            formData.append('imageUrl', imageUrl)
        }

        try {
            const response = await updatePet(petDetail.petId, formData)
            if (response.isSuccess) {
                alert('애완동물 정보 업데이트 성공하였습니다.')
                navigate('/petlist')
            } else {
                setError(response.message)
                alert('애완동물 정보 업데이트 실패하였습니다. 다시 시도해주세요.')
            }
        } catch (error) {
            setError('애완동물 정보 업데이트 실패')
        }
    }

    const handleDelete = async () => {
        if (petDetail) {
            try {
                const response = await deletePet(petDetail.petId)
                if (response.isSuccess) {
                    alert('애완동물 삭제 성공하였습니다.')
                    navigate('/petlist')
                } else {
                    setError(response.message)
                    alert('애완동물 삭제 실패하였습니다. 다시 시도해주세요.')
                }
            } catch (error) {
                setError('애완동물 삭제 에러')
            }
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            setImageUrl(file)
            const reader = new FileReader()
            reader.onloadend = () => setImagePreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!petDetail) return <p>Pet 상세정보를 찾을 수 없습니다.</p>

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>강아지 상세 정보 수정</ST.Text>
            <ST.Form onSubmit={handleSubmit}>
                <ST.PetInputBox>
                    <ST.Label>
                        강아지의 이름을 알려주세요
                        <ST.Input
                            type="text"
                            name="petName"
                            value={petDetail?.petName || ''}
                            onChange={handleInputChange}
                        />
                        {petNameError && <ST.Error>{petNameError}</ST.Error>}
                    </ST.Label>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>강아지 성별을 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {petDetail?.petGender === 'MALE' ? '남아' : '여아'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setPetDetail({ ...petDetail, petGender: 'MALE' })}>
                                    남아
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setPetDetail({ ...petDetail, petGender: 'FEMALE' })}>
                                    여아
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ST.StDropdown>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>강아지의 크기를 입력해주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-kind">
                                {petDetail?.petKind === 'SMALL'
                                    ? '소형견'
                                    : petDetail?.petKind === 'MEDIUM'
                                      ? '중형견'
                                      : '대형견'}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleKindChange('SMALL')}>소형견</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleKindChange('MEDIUM')}>중형견</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleKindChange('LARGE')}>대형견</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ST.StDropdown>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>
                        강아지의 특징을 적어주세요
                        <ST.DescInput
                            placeholder="Pet의 특징을 입력해주세요"
                            name="petInfo"
                            value={petDetail?.petInfo || ''}
                            onChange={handleInputChange}
                        />
                        {petInfoError && <ST.Error>{petInfoError}</ST.Error>}
                    </ST.Label>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>사진을 등록해주세요</ST.Label>
                    <ST.Input
                        id="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageFileChange}
                        style={{ display: 'none' }}
                    />
                    <ST.ImgWrap>
                        <ST.FileIcon onDragOver={handleDragOver} onDrop={handleDrop}>
                            <ST.ImgLabel htmlFor="image">
                                {imagePreviewUrl ? (
                                    <ST.ImageContainer>
                                        <ST.Image src={imagePreviewUrl} alt="Pet Preview" />
                                    </ST.ImageContainer>
                                ) : (
                                    <>
                                        <i className="fas fa-upload" />
                                        <ST.FileSpan>파일 열기</ST.FileSpan>
                                        <ST.FileP>파일 형식은 jpg, jpeg, png만 업로드 가능합니다.</ST.FileP>
                                    </>
                                )}
                            </ST.ImgLabel>
                        </ST.FileIcon>
                    </ST.ImgWrap>
                </ST.PetInputBox>

                <ST.ButtonContainer>
                    <ST.Button type="submit">입력 수정</ST.Button>
                    <ST.Button onClick={handleDelete}>입력 삭제</ST.Button>
                </ST.ButtonContainer>
            </ST.Form>
        </ST.Container>
    )
}

export default PetModify