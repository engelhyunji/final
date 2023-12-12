import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopPostData } from './Shops'
import { getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'

const ShopsModify: React.FC = () => {
    const { shopId } = useParams()
    const navigate = useNavigate()
    const [shopRequestDto, setShopRequestDto] = useState<ShopPostData>({
        shopName: '',
        shopTime: '',
        shopTel: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
    })

    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const [uploadImage, setUploadImage] = useState<File | string>('')
    const [initialImgLoaded, setInitialImgLoaded] = useState(false);


    useQuery(['detailShopData', Number(shopId)], () => getDetailShop(Number(shopId)), {
        onSuccess: (data) => {
            console.log('상품 디테일 불러오기 data', data?.shopResponseDto)
            // shopResponseDto(받은 값)에서 ShopPostData 형식으로 변환
            const transformedShopData: ShopPostData | null = data?.shopResponseDto
                ? {
                    shopName: data.shopResponseDto.shopName,
                    shopTime: data.shopResponseDto.shopTime,
                    shopTel: data.shopResponseDto.shopTel,
                    shopAddress: data.shopResponseDto.shopAddress,
                    shopType: data.shopResponseDto.shopType,
                    shopDescribe: data.shopResponseDto.shopDescribe,
                }
                : null
                if (data?.shopResponseDto?.imageUrls) {
                    // 기존 미리보기 제일 처음에만 담음
                    if (!initialImgLoaded) {
                        setImgUrl(data?.shopResponseDto?.imageUrls);
                        setInitialImgLoaded(true);
                    }
                }

            if (transformedShopData) {
                setShopRequestDto(transformedShopData)
            }
        },
    })
    useEffect(() => {
        console.log('setShopRequestDto', shopRequestDto)
    }, [shopRequestDto])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setShopRequestDto((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleImageFileChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = () => {
                    const result = reader.result as string

                    // 이미지 업데이트
                    setImgUrl(result)
                    setUploadImage(file)
                }
                reader.readAsDataURL(e.target.files[0])
            }
        },
        [setImgUrl, setUploadImage],
    )

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
            const response = await instance.put(`/shops/${shopId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('가게 등록 response :', response.data)
            navigate('/shopslist')
        } catch (error) {
            console.error('가게 등록 에러 :', error)
        }
    }

    return (
        <ST.Container>
            <ST.Text>가게 등록</ST.Text>
            <ST.Form onSubmit={handleSubmit}>
                <ST.Label>이미지</ST.Label>
                <ST.Input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageFileChange} />
                <ST.Wrap>{imgUrl && <ST.Image src={imgUrl} alt="ShopImg" />}</ST.Wrap>
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

                <ST.Button type="submit">등록하기</ST.Button>
                <ST.Button onClick={() => navigate(-1)}>취소</ST.Button>
            </ST.Form>
        </ST.Container>
    )
}

export default ShopsModify
