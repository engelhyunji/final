import React, { useState, ChangeEvent, FormEvent } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ST from './style'
// import { useAuth } from '../../context/AuthContext'
import instance from '../../apis/instance'
import { PetDetails } from '../../apis/api/pet'

const Pet: React.FC = () => {
    const [petName, setPetName] = useState<string>('')
    const [petGender, setPetGender] = useState<'MALE' | 'FEMALE'>('MALE')
    const [petKind, setPetKind] = useState<'SMALL' | 'MEDIUM' | 'LARGE'>('SMALL')
    const [petInfo, setPetInfo] = useState<string>('')
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    // const { nickname } = useAuth()

    const genderOptions = ['MALE', 'FEMALE']
    const kindOptions = ['SMALL', 'MEDIUM', 'LARGE']

    const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPetGender(e.target.value as 'MALE' | 'FEMALE')
    }

    const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPetKind(e.target.value as 'SMALL' | 'MEDIUM' | 'LARGE')
    }

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
                setRegistrationStatus('애완동물 정보가 성공적으로 등록되었습니다.')
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
        <ST.Content>
            <ST.Text>애완동물 정보 추가</ST.Text>
            {registrationStatus && <p>{registrationStatus}</p>}
            <ST.Form onSubmit={handleSubmit}>
                {/* <p>로그인한 사용자: {nickname}</p> */}
                <ST.Label>
                    애완동물 이름:
                    <ST.Input type="text" value={petName} onChange={handlePetNameChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    애완동물 성별:
                    <select className="form-control" value={petGender} onChange={handleGenderChange}>
                        {genderOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === 'MALE' ? '남아' : '여아'}
                            </option>
                        ))}
                    </select>
                </ST.Label>
                <ST.Label>
                    애완동물 종류:
                    <select className="form-control" value={petKind} onChange={handleKindChange}>
                        {kindOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === 'SMALL' ? '소형견' : option === 'MEDIUM' ? '중형견' : '대형견'}
                            </option>
                        ))}
                    </select>
                </ST.Label>
                <ST.Label>
                    애완동물 특이사항:
                    <ST.Textarea value={petInfo} onChange={handleInfoChange} />
                </ST.Label>

                <br />
                <ST.Label>
                    애완동물 사진:
                    <ST.Input type="file" accept="image/*" onChange={handleImageFileChange} />
                </ST.Label>
                <br />
                <ST.Wrap> {imagePreviewUrl && <ST.Image src={imagePreviewUrl} alt="Pet Preview" />}</ST.Wrap>

                <ST.Button type="submit">Add Pet</ST.Button>
            </ST.Form>
        </ST.Content>
    )
}

export default Pet
