import React, { useState, ChangeEvent, FormEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ST from './style'
import Dropdown from 'react-bootstrap/Dropdown'
import instance from '../../apis/instance'
import { PetDetails } from '../../apis/api/pet'
import BackWave from '../BackWave'

export interface StatusMessageProps {
    message?: string
}

const Pet: React.FC = () => {
    const [petName, setPetName] = useState<string>('')
    const [petGender, setPetGender] = useState<'MALE' | 'FEMALE'>('MALE')
    const [petKind, setPetKind] = useState<'SMALL' | 'MEDIUM' | 'LARGE'>('SMALL')
    const [petInfo, setPetInfo] = useState<string>('')
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)


    const handleGenderChange = (gender: 'MALE' | 'FEMALE') => {
        setPetGender(gender)
    }

    const handleKindChangeDropdown = (kind: 'SMALL' | 'MEDIUM' | 'LARGE') => {
        setPetKind(kind);
    };
    

    const handleInfoChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setPetInfo(e.target.value)
    }

    const handlePetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPetName(e.target.value)
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
        const formData = new FormData()

        formData.append('petName', petName)
        formData.append('petGender', petGender)
        formData.append('petKind', petKind)
        formData.append('petInfo', petInfo)
        imageFiles.forEach((file) => formData.append('imageUrl', file))

        try {
            const response = await instance.post<PetDetails>('/api/pets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200 || response.status === 201) {
                alert('애완동물 정보가 성공적으로 등록되었습니다.🐶')

                resetFormData()
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

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>Pet 등록하기</ST.Text>
            <ST.LoginP>사랑스러운 반려동물을 등록하고 더 많은 매칭 서비스를 이용해보세요!</ST.LoginP>

            <ST.Form onSubmit={handleSubmit}>
                <ST.PetInputBox>
                    <ST.Label>Pet의 이름을 알려주세요</ST.Label>
                    <ST.Input type="text" placeholder="Pet의 이름을 입력해주세요" value={petName} onChange={handlePetNameChange} />
                </ST.PetInputBox>

                <ST.PetInputBox>
                    <ST.Label>Pet 성별을 알려주세요</ST.Label>
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
                    <ST.Label>Pet의 크기를 알려주세요</ST.Label>
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
                    <ST.Label>Pet의 특징을 적어주세요</ST.Label>
                    <ST.DescInput value={petInfo} placeholder="Pet의 특징을 입력해주세요" onChange={handleInfoChange} />
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

                {registrationStatus && (
                    <ST.StatusMessage message={registrationStatus}>{registrationStatus}</ST.StatusMessage>
                )}

                <ST.PetBtn type="submit">입력 완료</ST.PetBtn>
            </ST.Form>
        </ST.Container>
    )
}

export default Pet
