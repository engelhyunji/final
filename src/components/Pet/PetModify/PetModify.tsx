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
        if (petDetail) {
            setPetDetail({ ...petDetail, [e.target.name]: e.target.value })
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

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!petDetail) return <p>Pet 상세정보를 찾을 수 없습니다.</p>

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>Pet 상세 정보 수정</ST.Text>
            <ST.Form onSubmit={handleSubmit}>
                <ST.PetInputBox>
                    <ST.Label>
                    Pet의 이름을 알려주세요
                        <ST.Input
                            type="text"
                            name="petName"
                            value={petDetail.petName || ''}
                            onChange={handleInputChange}
                        />
                    </ST.Label>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>Pet 성별을 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                {petDetail.petGender === 'MALE' ? '남아' : '여아'}
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

                {/* <select name="petKind" value={petDetail.petKind || ''} onChange={handleInputChange}>
                        <option value="SMALL">소형견</option>
                        <option value="MEDIUM">중형견</option>
                        <option value="LARGE">대형견</option>
                    </select> */}

                <ST.PetInputBox>
                    <ST.Label>Pet의 크기를 입력해주세요</ST.Label>
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
                    Pet의 특징을 적어주세요
                        <ST.DescInput
                            placeholder="Pet의 특징을 입력해주세요"
                            value={petDetail.petInfo || ''}
                            onChange={handleInputChange}
                        />
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
                        <ST.ImgLabel htmlFor="image">
                            {!imagePreviewUrl && (
                                <>
                                    <p>
                                        <ST.FileSpan>파일 열기</ST.FileSpan> 혹은 끌어다 놓기
                                    </p>
                                    <ST.FileP>파일 형식은 jpg, jpeg, png만 업로드 가능합니다.</ST.FileP>
                                </>
                            )}
                            {imagePreviewUrl && <ST.Image src={imagePreviewUrl} alt="Pet Preview" />}
                        </ST.ImgLabel>
                    </ST.ImgWrap>
                </ST.PetInputBox>

                {/* {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />} */}
                <ST.ButtonContainer>
                    <ST.Button type="submit">Pet 수정</ST.Button>
                    <ST.Button onClick={handleDelete}>Pet 삭제</ST.Button>
                </ST.ButtonContainer>
            </ST.Form>
        </ST.Container>
    )
}

export default PetModify
