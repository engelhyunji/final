import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'

interface PetDetails {
    shopId: number
    Id: number
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    imageUrl: null // 이미지 타입 string은 아니고, 어떤걸까??
}

const Shops: React.FC = () => {
    const [shopName, setShopName] = useState<string>('')
    const [shopTime, setShopTime] = useState<string>('')
    const [shopTel, setShopTel] = useState<string>('')
    const [shopAddress, setShopAddress] = useState<string>('')
    const [shopType, setShopType] = useState<string>('')
    const [shopDescribe, setShopDescribe] = useState<string>('')
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [petDetails, setPetDetails] = useState<PetDetails | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    useEffect(() => {
        fetchPetDetails()
    }, [])

    const fetchPetDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL2}/shops`, {
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

    const handleShopNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopName(e.target.value)
    }

    const handleShopTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopTime(e.target.value)
    }

    const handleShopTelChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopTel(e.target.value)
    }

    const handleShopAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopAddress(e.target.value)
    }

    const handleShopTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopType(e.target.value)
    }

    const handleShopDescribeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShopDescribe(e.target.value)
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
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
        formData.append('shopName', shopName)
        formData.append('shopTime', shopTime)
        formData.append('shopTel', shopTel)
        formData.append('shopAddress', shopAddress)
        formData.append('shopType', shopType)
        formData.append('shopDescribe', shopDescribe)

        if (imageUrl) {
            formData.append('imageUrl', imageUrl)
        }

        const formDataObject: any = {}
        formData.forEach((value, key) => {
            formDataObject[key] = value
        })

        console.log('formDataObject:', formDataObject)

        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL2}/shops`, formData, {
                headers: {
                    Authorization: `${localStorage.getItem('accesstoken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            setPetDetails(response.data)
            setShopName('')
            setShopTime('')
            setShopTel('')
            setShopAddress('')
            setShopType('')
            setShopDescribe('')
            setImageUrl(null)
            setRegistrationStatus('가게 정보 등록 성공!')
        } catch (error) {
            console.error('Error adding shop:', error.response ? error.response.data : error.message)
            setRegistrationStatus('가게 정보 등록 실패 다시 시도.')
        }
    }

    return (
        <div>
            <p>가게 정보 추가</p>
            {registrationStatus && <p>{registrationStatus}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Shop Name:
                    <input type="text" value={shopName} onChange={handleShopNameChange} />
                </label>
                <br />
                <label>
                    Shop Time:
                    <input type="text" value={shopTime} onChange={handleShopTimeChange} />
                </label>
                <br />
                <label>
                    Shop Tel:
                    <input type="text" value={shopTel} onChange={handleShopTelChange} />
                </label>
                <br />
                <label>
                    Shop Address:
                    <input type="text" value={shopAddress} onChange={handleShopAddressChange} />
                </label>
                <br />
                <label>
                    Shop Type:
                    <input type="text" value={shopType} onChange={handleShopTypeChange} />
                </label>
                <br />
                <label>
                    Shop Describe:
                    <input type="text" value={shopDescribe} onChange={handleShopDescribeChange} />
                </label>
                <br />
                <label>
                    Image:
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageFileChange} />
                </label>
                <br />
                {imageUrl && <img src={imageUrl} alt="Shop" />}
                <button type="submit" value="Send">
                    Add Shop
                </button>
            </form>

            {petDetails && (
                <div>
                    <p>Shop Details</p>
                    <p>Shop Name: {petDetails.shopName}</p>
                    <p>shopTime: {petDetails.shopTime}</p>
                    <p>shopTel: {petDetails.shopTel}</p>
                    <p>shopAddres: {petDetails.shopAddress}</p>
                    <p>shopType: {petDetails.shopType}</p>
                    <p>shopDescribe: {petDetails.shopDescribe}</p>
                    <p>Shop Image: {petDetails.imageUrl}</p>
                </div>
            )}
        </div>
    )
}

export default Shops
