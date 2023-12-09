import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as ST from './style'

interface PetDetails {
    id: number
    petId: number
    petName: string
    petGender: '남아' | '여아'
    petKind: '소형견' | '중형견' | '대형견'
    petInfo: string
    imageUrl: string
}

const Pet: React.FC = () => {
    const [petName, setPetName] = useState<string>('')
    const [petGender, setPetGender] = useState<'남아' | '여아'>('남아')
    const [petKind, setPetKind] = useState<'소형견' | '중형견' | '대형견'>('소형견')
    const [petInfo, setPetInfo] = useState<'알러지가 있습니다' | '알러지가 없습니다'>('알러지가 있습니다')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [petDetails, setPetDetails] = useState<PetDetails | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    const genderOptions = ['남아', '여아']
    const kindOptions = ['소형견', '중형견', '대형견']
    const infoOptions = ['알러지가 있습니다', '알러지가 없습니다']

    const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPetGender(e.target.value as '남아' | '여아')
    }

    const handleKindChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPetKind(e.target.value as '소형견' | '중형견' | '대형견')
    }

    const handleInfoChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPetInfo(e.target.value as '알러지가 있습니다' | '알러지가 없습니다')
    }

    useEffect(() => {
        fetchPetDetails()
    }, [])

    const fetchPetDetails = async () => {
        try {
            const response = await axios.get<PetDetails>(`${import.meta.env.VITE_APP_SERVER_URL2}/pets`, {
                headers: {
                    Authorization: `${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data) {
                setPetDetails(response.data)
            }
        } catch (error) {
            console.error('Error fetching pet details:', error)
        }
    }

    const handlePetNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPetName(e.target.value)
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('petName', petName)

        if (imageUrl) {
            formData.append('imageUrl', imageUrl)
        }

        try {
            const response = await axios.post<PetDetails>(`${import.meta.env.VITE_APP_SERVER_URL2}/pets`, formData, {
                headers: {
                    Authorization: `${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                setPetDetails(response.data)
                setPetName('')
                setImageUrl(null)
                setRegistrationStatus('애견 정보 등록 성공!')
            } else {
                console.error('Unexpected status code:', response.status)
                setRegistrationStatus('서버 응답이 올바르지 않습니다.')
            }
        } catch (error) {
            console.error('Error adding pet:', error)
            setRegistrationStatus('애견 정보 등록 실패 다시 시도.')
        }
    }

    return (
        <ST.Content>
            <ST.Text>애견 정보 추가</ST.Text>
            {registrationStatus && <p>{registrationStatus}</p>}
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>
                    Pet Name:
                    <ST.Input type="text" value={petName} onChange={handlePetNameChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Image:
                    <ST.Input type="file" multiple accept="image/*" onChange={handleImageFileChange} />
                </ST.Label>
                <br />
                <ST.Wrap>{imageUrl && <ST.Image src={imageUrl} alt="Pet" />}</ST.Wrap>

                <ST.Label>
                    Gender:
                    <select className="form-control" value={petGender} onChange={handleGenderChange}>
                        {genderOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </ST.Label>
                <ST.Label>
                    Kind:
                    <select className="form-control" value={petKind} onChange={handleKindChange}>
                        {kindOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </ST.Label>
                <ST.Label>
                    Info:
                    <select className="form-control" value={petInfo} onChange={handleInfoChange}>
                        {infoOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </ST.Label>

                <ST.Button type="submit">Add Pet</ST.Button>
            </ST.Form>
            {petDetails && (
                <div>
                    <p>Pet Details</p>
                    <p>Pet Name: {petDetails.petName}</p>
                    <p>Pet Image: {petDetails.imageUrl}</p>
                </div>
            )}
        </ST.Content>
    )
}

export default Pet
