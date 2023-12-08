import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import instance from '../../apis/instance'
import * as ST from './style'

interface ShopPostData {
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    imageUrl: string
}

const Shops: React.FC = () => {
    const [shopRequestDto, setShopRequestDto] = useState<ShopPostData>({
        shopName: '',
        shopTime: '',
        shopTel: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
        imageUrl: '',
    })

    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [shopDetails, setShopDetails] = useState<ShopPostData | null>(null)

    useEffect(() => {
        fetchShopDetails()
    }, [])

    const fetchShopDetails = async () => {
        try {
            const response = await instance.get('/shops')

            if (response.data && response.data.length > 0) {
                setShopDetails(response.data[0])
            }
        } catch (error) {
            console.error('Error fetching shop details:', error)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShopRequestDto((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log('e.target.files[0] 파일확인', e.target.files[0])
            const reader = new FileReader()
            reader.onload = () => {
                const imageUrlValue = reader.result as string
                setImageUrl(imageUrlValue)
                console.log('imageUrl 값확인 ', imageUrlValue)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    useEffect(() => {
        console.log('상태 업데이트가 완료된 후', imageUrl)
    }, [imageUrl])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        Object.entries(shopRequestDto).forEach(([key, value]) => {
            formData.append(key, value)
        })
        if (imageUrl) {
            // formData.append('image', imageUrl)
            formData.append('imageUrl', imageUrl)
        }

        try {
            const response = await instance.post('/shops', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

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
        } catch (error) {
            console.error('가게 등록 에러 :', error)
        }
    }

    return (
        <ST.Content>
            <ST.Text>가게 등록</ST.Text>
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>가게 이름 </ST.Label>
                <ST.Input type="text" name="shopName" value={shopRequestDto.shopName} onChange={handleChange} />
                <ST.Label>영업 시간</ST.Label>
                <ST.Input type="text" name="shopTime" value={shopRequestDto.shopTime} onChange={handleChange} />
                <ST.Label>연락처</ST.Label>
                <ST.Input type="text" name="shopTel" value={shopRequestDto.shopTel} onChange={handleChange} />
                <ST.Label>주소</ST.Label>
                <ST.Input type="text" name="shopAddress" value={shopRequestDto.shopAddress} onChange={handleChange} />
                <ST.Label>가게 유형</ST.Label>
                <ST.SelectContainer>
                    <ST.Select name="shopType" value={shopRequestDto.shopType} onChange={handleChange}>
                        <option value="">가게 유형을 선택해주세요</option>
                        <option value="GROOMING">GROOMING</option>
                        <option value="HOSPITAL">HOSPITAL</option>
                        <option value="CAFE">CAFE</option>
                        <option value="ETC">ETC</option>
                    </ST.Select>
                </ST.SelectContainer>
                <ST.Label>소개글</ST.Label>
                <ST.Input type="text" name="shopDescribe" value={shopRequestDto.shopDescribe} onChange={handleChange} />
                <ST.Label>이미지</ST.Label>
                <ST.Input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageFileChange} />
                <ST.Wrap>{imageUrl && <ST.Image src={imageUrl} alt="Shop" />}</ST.Wrap>
                <ST.Button type="submit" value="Send">
                    등록하기
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
