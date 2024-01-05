import React, { useState, ChangeEvent, FormEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ST from './style'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import { PetDetails } from '../../apis/api/petlist'
import BackWave from '../BackWave'
import { ApiResponse } from '../../apis/api/petlist'

const Pet: React.FC = () => {
    // 상태 관리 변수들
    const [petName, setPetName] = useState<string>('')
    const [petGender, setPetGender] = useState<'MALE' | 'FEMALE'>('MALE')
    const [petKind, setPetKind] = useState<'SMALL' | 'MEDIUM' | 'LARGE'>('SMALL')
    const [petInfo, setPetInfo] = useState<string>('')
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    const [petNameError, setPetNameError] = useState<string | null>(null)
    const [petInfoError, setPetInfoError] = useState<string | null>(null)

    const navigate = useNavigate()

    // 이벤트 핸들러 함수들
    const handleGenderChange = (gender: 'MALE' | 'FEMALE') => {
        setPetGender(gender)
    }
    const handleKindChangeDropdown = (kind: 'SMALL' | 'MEDIUM' | 'LARGE') => {
        setPetKind(kind)
    }
    const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newInfo = e.target.value
        setPetInfo(newInfo)

        // Check if pet info exceeds 50 characters
        if (newInfo.length > 50) {
            setPetInfoError('펫 정보는 50글자 이내로 입력해주세요.')
        } else {
            setPetInfoError(null)
        }
    }
    const handlePetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value
        setPetName(newName)

        if (newName.length > 10) {
            setPetNameError('펫 이름은 10글자 이내로 입력해주세요.')
        } else {
            setPetNameError(null)
        }
    }
    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImageFiles([...e.target.files])
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setImagePreviewUrl(fileReader.result as string)
            }
            fileReader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!petName || !petInfo || imageFiles.length === 0) {
            alert('모든 필수 정보를 입력해주세요.')
            return
        }

        if (petNameError || petInfoError) {
            alert('글자수 제한 조건을 맞춰서 입력해주세요.')
            return
        }
        const formData = new FormData()
        formData.append('petName', petName)
        formData.append('petGender', petGender)
        formData.append('petKind', petKind)
        formData.append('petInfo', petInfo)
        imageFiles.forEach((file) => formData.append('imageUrl', file))

        try {
            const response = await instance.post<ApiResponse<PetDetails>>('/api/pets', formData)
            if (response.data.isSuccess && (response.status === 200 || response.status === 201)) {
                alert('애완동물 정보가 성공적으로 등록되었습니다.')
                resetFormData()
                navigate('/petlist')
            } else {
                setRegistrationStatus('애완동물 정보 등록에 실패했습니다.')
            }
        } catch (error) {
            console.error('Error processing pet:', error)
            setRegistrationStatus('애완동물 정보 처리에 실패했습니다.')
        }
    }

    const resetFormData = () => {
        setPetName('')
        setPetGender('MALE')
        setPetKind('SMALL')
        setPetInfo('')
        setImageFiles([])
        setImagePreviewUrl(null)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            setImageFiles([file])
            const reader = new FileReader()
            reader.onloadend = () => setImagePreviewUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>강아지 등록하기</ST.Text>
            <ST.LoginP>사랑스러운 반려동물을 등록하고 더 많은 매칭 서비스를 이용해보세요!</ST.LoginP>

            <ST.Form onSubmit={handleSubmit}>
                <ST.PetInputBox>
                    <ST.Label>강아지의 이름을 알려주세요</ST.Label>
                    <ST.Input
                        type="text"
                        placeholder="Pet의 이름을 입력해주세요"
                        value={petName}
                        onChange={handlePetNameChange}
                    />
                    {petNameError && <ST.Error>{petNameError}</ST.Error>}
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>강아지의 성별을 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {petGender === 'MALE' ? '남아' : '여아'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleGenderChange('MALE')}>남아</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleGenderChange('FEMALE')}>여아</Dropdown.Item>
                        </Dropdown.Menu>
                    </ST.StDropdown>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>강아지의 크기를 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-kind">
                            {petKind === 'SMALL' ? '소형견' : petKind === 'MEDIUM' ? '중형견' : '대형견'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleKindChangeDropdown('SMALL')}>소형견</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleKindChangeDropdown('MEDIUM')}>중형견</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleKindChangeDropdown('LARGE')}>대형견</Dropdown.Item>
                        </Dropdown.Menu>
                    </ST.StDropdown>
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>강아지의 특징을 적어주세요</ST.Label>
                    <ST.DescInput value={petInfo} placeholder="Pet의 특징을 입력해주세요" onChange={handleInfoChange} />
                    {petInfoError && <ST.Error>{petInfoError}</ST.Error>}
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

                {registrationStatus && (
                    <ST.Error>{registrationStatus}</ST.Error>
                )}

                <ST.PetBtn type="submit">입력 완료</ST.PetBtn>
            </ST.Form>
        </ST.Container>
    )
}

export default Pet
