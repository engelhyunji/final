import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import instance from '../../../apis/instance'
// import { useAuth } from '../../../context/AuthContext'
import * as ST from './style'
import { deletePet, updatePet } from '../../../apis/api/petmodify'
import { PetDetails } from '../../../apis/api/petmodify'

const PetModify: React.FC = () => {
    const [petDetail, setPetDetail] = useState<PetDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null) // 이미지 미리보기 URL 상태
    const { petId } = useParams<{ petId: string }>()
    const navigate = useNavigate()
    // const { nickname } = useAuth()

    useEffect(() => {
        if (petId) {
            fetchPetDetail(parseInt(petId))
        }
    }, [petId])

    const fetchPetDetail = async (id: number) => {
        try {
            const response = await instance.get<PetDetails>(`/api/pets/${id}`)
            setPetDetail(response.data)
            setLoading(false)
        } catch (error) {
            console.error('에러:', error)
            setError('에러')
            setLoading(false)
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (petDetail) {
            setPetDetail({ ...petDetail, [e.target.name]: e.target.value } as PetDetails)
        }
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setImageFile(e.target.files[0])

            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (petDetail) {
            const formData = new FormData()
            formData.append('petName', petDetail.petName)
            formData.append('petGender', petDetail.petGender)
            formData.append('petKind', petDetail.petKind)
            formData.append('petInfo', petDetail.petInfo)
            if (imageFile) {
                formData.append('imageUrl', imageFile)
            }

            try {
                await updatePet(petDetail.petId, formData)
                console.log('업데이트 성공')
                navigate('/petlist')
            } catch (error) {
                console.error('업데이트 에러:', error)
                setError('업데이트 에러')
            }
        }
    }

    const handleDelete = async () => {
        if (petDetail) {
            try {
                await deletePet(petDetail.petId)
                console.log('애완동물 정보 삭제 성공')
                navigate('/petlist')
            } catch (error) {
                console.error('애완동물 삭제 에러:', error)
                setError('애완동물 삭제 에러')
            }
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!petDetail) return <p>애완동물 상세정보를 찾을 수 없습니다...</p>

    return (
        <ST.Content>
            <ST.Text>애완동물 상세 정보 수정</ST.Text>
            {/* <p>로그인한 사용자: {nickname}</p> */}
            <button onClick={handleDelete}>애완동물 삭제</button>
            <form onSubmit={handleSubmit}>
                <label>
                    애완동물 이름:
                    <input type="text" name="petName" value={petDetail.petName || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    애완동물 성별:
                    <select name="petGender" value={petDetail.petGender || ''} onChange={handleInputChange}>
                        <option value="MALE">남아</option>
                        <option value="FEMALE">여아</option>
                    </select>
                </label>
                <br />
                <label>
                    애완동물 종류:
                    <select name="petKind" value={petDetail.petKind || ''} onChange={handleInputChange}>
                        <option value="SMALL">소형견</option>
                        <option value="MEDIUM">중형견</option>
                        <option value="LARGE">대형견</option>
                    </select>
                </label>
                <br />
                <label>
                    애완동물 특이사항:
                    <textarea name="petInfo" value={petDetail.petInfo || ''} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    애완동물 사진:
                    <input type="file" accept="image/*" onChange={handleImageFileChange} />
                </label>
                <br />
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" />}
                <button type="submit">Update Pet</button>
            </form>
            {petDetail.imageUrl && <img src={petDetail.imageUrl} alt={`${petDetail.petName} 이미지`} />}
        </ST.Content>
    )
}

export default PetModify
