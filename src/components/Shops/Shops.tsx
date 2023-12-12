import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
// import axios from 'axios'
import * as ST from './style'
import instance from '../../apis/instance'

export interface ShopPostData {
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    // imageUrl: string
}

const Shops: React.FC = () => {
    // const navigate = useNavigate()
    const [shopRequestDto, setShopRequestDto] = useState<ShopPostData>({
        shopName: '',
        shopTime: '',
        shopTel: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
        // imageUrl: '',
    })

    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const [uploadImage, setUploadImage] = useState<File | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShopRequestDto((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    // const imgChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setUploadImage(e.target.files?.[0])
    // }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            console.log('e.target.files[0] 파일확인', e.target.files[0])
            const reader = new FileReader()
            reader.onload = () => {
                const result = reader.result as string
                console.log('파일리더(미리보기) :', result)

                // 이미지 업데이트
                setImgUrl(result)
                setUploadImage(file)

                console.log('uploadImage 값확인 ', uploadImage)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    useEffect(() => {
        console.log('uploadImage 업데이트 확인', uploadImage)
    }, [uploadImage])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        // 나머지 데이터
        Object.entries(shopRequestDto).forEach(([key, value]) => {
            formData.append(key, value)
        })

        // 이미지 파일
        if (uploadImage) {
            formData.append('imageUrl', uploadImage)
        }

        try {
            const response = await instance.post(`/shops`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('가게 등록 response :', response.data)

            setShopRequestDto({
                shopName: '',
                shopTime: '',
                shopTel: '',
                shopAddress: '',
                shopType: '',
                shopDescribe: '',
            })
            setImgUrl(null) // 이미지 초기화
            setUploadImage(null)
        } catch (error) {
            console.error('가게 등록 에러 :', error)
        }
    }

    return (
        <ST.Container>
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
                <ST.Wrap>{imgUrl && <ST.Image src={imgUrl} alt="Shop" />}</ST.Wrap>
                <ST.Button type="submit" value="Send">
                    등록하기
                </ST.Button>
            </ST.Form>
        </ST.Container>
    )
}

export default Shops
