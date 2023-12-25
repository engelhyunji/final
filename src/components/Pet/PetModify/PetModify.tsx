import React, { useState, useEffect, ChangeEvent, FormEvent, useReducer } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PetDetails, fetchPetDetail, updatePet, deletePet } from '../../../apis/api/petmodify'
import * as ST from './style'

const initialState: PetDetails = {
    petId: 0,
    petName: '',
    petGender: 'MALE',
    petKind: 'SMALL',
    petInfo: '',
    imageUrl: '',
}

const reducer = (state: PetDetails, action: Partial<PetDetails>) => {
    return { ...state, ...action }
}

const PetModify: React.FC = () => {
    const [petDetail, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
    const { petId } = useParams<{ petId: string }>()
    const navigate = useNavigate()

    useEffect(() => {
        if (petId) {
            fetchPetDetail(parseInt(petId)).then((response) => {
                if (response.status === 200 && response.isSuccess) {
                    console.log(response.isSuccess)
                    dispatch(response.result)
                } else {
                    setError(response.message)
                }
                setLoading(false)
            })
        }
    }, [petId])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        dispatch({ [name]: value })
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            console.log(filesArray)
            setImageFiles(filesArray)
            setImagePreviewUrls([])

            filesArray.forEach((file) => {
                console.log(file)
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    setImagePreviewUrls((prev) => [...prev, reader.result as string])
                }
            })
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!petDetail.petName || !petDetail.petGender || !petDetail.petKind || !petDetail.petInfo) {
            setError('모든 필드를 입력해주세요.')
            return
        }

        const formData = new FormData()
        formData.append('petName', petDetail.petName)
        formData.append('petGender', petDetail.petGender)
        formData.append('petKind', petDetail.petKind)
        formData.append('petInfo', petDetail.petInfo)

        imageFiles.forEach((file) => {
            formData.append('imageFiles', file)
        })

        try {
            const response = await updatePet(petDetail.petId, formData)
            console.log(response)

            if (response.status === 200 && response.isSuccess) {
                navigate('/petlist')
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError('Pet 정보 수정 실패했습니다.')
        }
    }

    const handleDelete = async () => {
        try {
            const response = await deletePet(petDetail.petId)
            // 상태 코드 204 로 바꾸기.
            if (response.status === 200 && response.isSuccess) {
                navigate('/petlist')
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError('Pet 삭제 실패했습니다.')
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <ST.Content>
            <ST.Text>Pet 상세 정보 수정</ST.Text>
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>
                    Pet 이름:
                    <input type="text" name="petName" value={petDetail.petName} onChange={handleInputChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 성별:
                    <select name="petGender" value={petDetail.petGender} onChange={handleInputChange}>
                        <option value="MALE">남아</option>
                        <option value="FEMALE">여아</option>
                    </select>
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 종류:
                    <select name="petKind" value={petDetail.petKind} onChange={handleInputChange}>
                        <option value="SMALL">소형견</option>
                        <option value="MEDIUM">중형견</option>
                        <option value="LARGE">대형견</option>
                    </select>
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 특이사항:
                    <textarea name="petInfo" value={petDetail.petInfo} onChange={handleInputChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Pet 사진:
                    <input type="file" accept="image/*" multiple onChange={handleImageFileChange} />
                </ST.Label>
                <br />
                {imagePreviewUrls.map((url, index) => (
                    <ST.Image key={index} src={url} alt={`Preview ${index}`} />
                ))}
                <ST.ButtonContainer>
                    <ST.Button type="submit">Pet 수정</ST.Button>
                    <ST.Button onClick={handleDelete}>Pet 삭제</ST.Button>
                </ST.ButtonContainer>
            </ST.Form>
        </ST.Content>
    )
}

export default PetModify
