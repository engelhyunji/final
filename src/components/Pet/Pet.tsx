import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'

interface PetDetails {
    id: number
    petId: number
    petName: string
    imageUrl: string
}

const Pet: React.FC = () => {
    const [petName, setPetName] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [petDetails, setPetDetails] = useState<PetDetails | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    useEffect(() => {
        fetchPetDetails()
    }, [])

    const fetchPetDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL2}/pets`, {
                headers: {
                    Authorization: `${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'application/json',
                },
            })

            if (response.data && response.data.length > 0) {
                setPetDetails(response.data[0])
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
            setImageUrl(e.target.files[0])

            const reader = new FileReader()
            reader.onload = () => {
                setImageUrl(reader.result as string)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('petName', petName)

        if (imageUrl) {
            formData.append('imageUrl', imageUrl)
        }

        const formDataObject: any = {}
        formData.forEach((value, key) => {
            formDataObject[key] = value
        })

        console.log('formDataObject:', formDataObject)

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_SERVER_URL2}/pets`,
                JSON.stringify(formDataObject),
                {
                    headers: {
                        Authorization: `${localStorage.getItem('accesstoken')}`,
                        'Content-Type': 'multipart/form-data', // // 백엔드 연동 코드
                        // 'Content-Type': 'application/json', // // json에 담지 않기, 데이터 담긴것 만 확인하기,
                    },
                },
            )

            setPetDetails(response.data)
            setPetName('')
            setImageUrl(null)
            setRegistrationStatus('애견 정보 등록 성공!')
        } catch (error) {
            console.error('Error adding pet:', error.response ? error.response.data : error.message)
            setRegistrationStatus('애견 정보 등록 실패 다시 시도.')
        }
    }

    return (
        <div>
            <p>애견 정보 추가</p>
            {registrationStatus && <p>{registrationStatus}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Pet Name:
                    <input type="text" value={petName} onChange={handlePetNameChange} />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" multiple accept="image/*" onChange={handleImageFileChange} />
                </label>
                <br />
                {imageUrl && <img src={imageUrl} alt="Pet" />}
                <button type="submit" value="Send">
                    Add Pet
                </button>
            </form>
            {petDetails && (
                <div>
                    <p>Pet Details</p>
                    <p>Pet Name: {petDetails.petName}</p>
                    <p>Pet Image: {petDetails.imageUrl}</p>
                </div>
            )}
        </div>
    )
}

export default Pet
