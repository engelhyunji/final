import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PetDetails, fetchPetDetail, updatePet, deletePet } from '../../../apis/api/petmodify'
import * as ST from './style'

const PetModify: React.FC = () => {
    const [petDetail, setPetDetail] = useState<PetDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
    const { petId } = useParams<{ petId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        if (petId) {
            console.log(`Fetching pet details for petId: ${petId}`)
            fetchPetDetail(parseInt(petId))
                .then((response) => {
                    console.log('Fetch response:', response)
                    if (response.isSuccess) {
                        setPetDetail(response.result)
                    } else {
                        setError(response.message)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    console.error('Fetch error:', error)
                    setError('펫 정보를 불러오는데 실패했습니다.')
                    setLoading(false)
                })
        }
    }, [petId])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        console.log('Input change:', e.target.name, e.target.value)
        if (petDetail) {
            setPetDetail({ ...petDetail, [e.target.name]: e.target.value } as PetDetails)
        }
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            console.log('Image file selected:', e.target.files[0])
            setImageFile(e.target.files[0])
            const reader = new FileReader()
            reader.onloadend = () => setImagePreviewUrl(reader.result as string)
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!petDetail || !petDetail.petName || !petDetail.petGender || !petDetail.petKind || !petDetail.petInfo) {
            setError('모든 필드를 채워주세요.')
            return
        }

        const formData = new FormData()
        formData.append('petName', petDetail.petName)
        formData.append('petGender', petDetail.petGender)
        formData.append('petKind', petDetail.petKind)
        formData.append('petInfo', petDetail.petInfo)

        if (imageFile) {
            formData.append('imageFile', imageFile)
        }

        try {
            const response = await updatePet(petDetail.petId, formData)
            if (response.isSuccess) {
                console.log('애완동물 정보 업데이트 성공')
                navigate('/petlist')
            } else {
                console.error('애완동물 정보 업데이트 실패:', response.message)
                setError(response.message)
            }
        } catch (error) {
            console.error('애완동물 정보 업데이트 에러:', error)
            setError('애완동물 정보 업데이트 실패')
        }
    }

    const handleDelete = async () => {
        if (petDetail) {
            try {
                const response = await deletePet(petDetail.petId)
                if (response.isSuccess) {
                    console.log('애완동물 삭제 성공')
                    navigate('/petlist')
                } else {
                    setError(response.message)
                }
            } catch (error) {
                console.error('애완동물 삭제 에러:', error)
                setError('애완동물 삭제 에러')
            }
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!petDetail) return <p>Pet 상세정보를 찾을 수 없습니다.</p>
    
    return (
        <ST.Content>
            <ST.Text>Pet 상세 정보 수정</ST.Text>
            {/* <p>로그인한 사용자: {nickname}</p> */}
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>
                    Pet 이름:
                    <input type="text" name="petName" value={petDetail.petName || ''} onChange={handleInputChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 성별:
                    <select name="petGender" value={petDetail.petGender || ''} onChange={handleInputChange}>
                        <option value="MALE">남아</option>
                        <option value="FEMALE">여아</option>
                    </select>
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 종류:
                    <select name="petKind" value={petDetail.petKind || ''} onChange={handleInputChange}>
                        <option value="SMALL">소형견</option>
                        <option value="MEDIUM">중형견</option>
                        <option value="LARGE">대형견</option>
                    </select>
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 특이사항:
                    <textarea name="petInfo" value={petDetail.petInfo || ''} onChange={handleInputChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 사진:
                    <input type="file" accept="image/*" onChange={handleImageFileChange} />
                </ST.Label>
                <br />
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
                <ST.ButtonContainer>
                    <ST.Button type="submit">Pet 수정</ST.Button>
                    <ST.Button onClick={handleDelete}>Pet 삭제</ST.Button>
                </ST.ButtonContainer>
            </ST.Form>
            {petDetail.imageUrl && <img src={petDetail.imageUrl} alt={`${petDetail.petName} 이미지`} />}
        </ST.Content>
    )
}

export default PetModify