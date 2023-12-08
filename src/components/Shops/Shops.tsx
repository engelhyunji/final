import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import * as ST from './style'

interface ShopDetails {
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    imageUrl: string
}

const Shops: React.FC = () => {
    const [shopRequestDto, setShopRequestDto] = useState<ShopDetails>({
        shopName: '',
        shopTime: '',
        shopTel: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
        imageUrl: '',
    })

    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [shopDetails, setShopDetails] = useState<ShopDetails | null>(null)
    const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)

    useEffect(() => {
        fetchShopDetails()
    }, [])

    const fetchShopDetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_SERVER_URL2}/shops`)

            if (response.data && response.data.length > 0) {
                setShopDetails(response.data[0])
            }

            console.log(response)
        } catch (error) {
            console.error('Error fetching shop details:', error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setShopRequestDto((prevData) => ({
            ...prevData,
            [name]: value,
        }))
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
        Object.entries(shopRequestDto).forEach(([key, value]) => {
            formData.append(key, value)
        })
        if (imageUrl) {
            formData.append('image', imageUrl)
        }

        console.log(imageUrl)
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL2}/shops`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log(response)
            if (response.status === 200) {
                setShopDetails(response.data)
                setShopRequestDto({
                    shopName: '',
                    shopTime: '',
                    shopTel: '',
                    shopAddress: '',
                    shopType: '',
                    shopDescribe: '',
                    imageUrl: '',
                })
                setImageUrl('')
                setRegistrationStatus('가게 정보 등록 성공!')
            } else if (response.status === 400) {
                console.error('Bad request. Validation error:', response.data)
                setRegistrationStatus('가게 정보 등록 실패. 입력값을 확인하세요.')
            } else {
                console.error('Unexpected status code:', response.status)
                setRegistrationStatus('가게 정보 등록 실패. 다시 시도하세요.')
            }
        } catch (error) {
            console.error('Error adding shop:', error.response ? error.response.data : error.message)
            setRegistrationStatus('가게 정보 등록 실패. 다시 시도하세요.')
            console.log('등록실패')
        }
    }

    return (
        <ST.Content>
            <ST.Text>가게 정보 추가</ST.Text>
            {registrationStatus && <p>{registrationStatus}</p>}
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>
                    Shop Name:
                    <ST.Input type="text" name="shopName" value={shopRequestDto.shopName} onChange={handleChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Shop Time:
                    <ST.Input type="text" name="shopTime" value={shopRequestDto.shopTime} onChange={handleChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Shop Tel:
                    <ST.Input type="text" name="shopTel" value={shopRequestDto.shopTel} onChange={handleChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Shop Address:
                    <ST.Input
                        type="text"
                        name="shopAddress"
                        value={shopRequestDto.shopAddress}
                        onChange={handleChange}
                    />
                </ST.Label>
                <br />
                <ST.Label>
                    Shop Type:
                    <ST.Input type="text" name="shopType" value={shopRequestDto.shopType} onChange={handleChange} />
                </ST.Label>
                <br />
                <ST.Label>
                    Shop Describe:
                    <ST.Input
                        type="text"
                        name="shopDescribe"
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                    />
                </ST.Label>
                <br />
                <ST.Label>
                    Image:
                    <ST.Input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageFileChange} />
                </ST.Label>
                <br />
                <ST.Wrap>{imageUrl && <ST.Image src={imageUrl} alt="Shop" />}</ST.Wrap>
                <ST.Button type="submit" value="Send">
                    Add Shop
                </ST.Button>
            </ST.Form>

            {shopDetails && (
                <div>
                    <p>Shop Details</p>
                    <p>Shop Name: {shopDetails.shopName}</p>
                    <p>Shop Time: {shopDetails.shopTime}</p>
                    <p>Shop Tel: {shopDetails.shopTel}</p>
                    <p>Shop Address: {shopDetails.shopAddress}</p>
                    <p>Shop Type: {shopDetails.shopType}</p>
                    <p>Shop Describe: {shopDetails.shopDescribe}</p>
                    <p>Shop Image: {shopDetails.imageUrl}</p>
                </div>
            )}
        </ST.Content>
    )
}

export default Shops
