import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback, useRef } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopPostData } from './Shops'
import { getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'
import BackWave from '../BackWave'

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
    const [initialImgLoaded, setInitialImgLoaded] = useState(false)

    // 전화번호(shopTel) 각 부분
    const [firstN, setFirstN] = useState<string>('')
    const [midN, setMidN] = useState<string>('')
    const [lastN, setLastN] = useState<string>('')
    const midNInput = useRef<HTMLInputElement>(null)
    const lastNInput = useRef<HTMLInputElement>(null)

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
                    setImgUrl(data?.shopResponseDto?.imageUrls)
                    setInitialImgLoaded(true)
                }
            }

            // 기존 데이터 담기
            if (transformedShopData) {
                setShopRequestDto(transformedShopData)

                // shopTel 각 부분 분리 후 담기
                const telParts = transformedShopData.shopTel.split('-')
                setFirstN(telParts[0] || '')
                setMidN(telParts[1] || '')
                setLastN(telParts[2] || '')
            }
        },
    })
    // useEffect(() => {
    //     console.log('setShopRequestDto', shopRequestDto)
    // }, [shopRequestDto])
    

    useEffect(() => {
        // 전체 전화번호 조합 업데이트
        const tel = `${firstN}-${midN}-${lastN}`;
        setShopRequestDto((prevData) => ({
            ...prevData,
            shopTel: tel,
        }));
    }, [firstN, midN, lastN]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        if (name === 'firstN' || name === 'midN' || name === 'lastN') {
            // 숫자만 최대 4자리 입력 정규식
            const telRegEx = /^[0-9\b -]{0,4}$/
            if (telRegEx.test(value)) {

                // 전화번호(shopTel) 각 부분 업데이트
                if (name === 'firstN' && value.length < 4) {
                    setFirstN(value)
                    if (value.length === 3) midNInput.current?.focus()
                }
                if (name === 'midN') {
                    setMidN(value)
                    if (value.length === 4) lastNInput.current?.focus()
                }
                if (name === 'lastN') setLastN(value)
            }

        } else {
            setShopRequestDto((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
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

    // useEffect(() => {
    //     console.log('uploadImage 업데이트 확인', uploadImage)
    // }, [uploadImage])

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
            const response = await instance.put(`/api/shops/${shopId}`, formData, {
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
            <BackWave />
            <ST.Text>가게 수정하기</ST.Text>

            <ST.Form onSubmit={handleSubmit}>
                <ST.ShopInputBox>
                    <ST.Label>수정할 사진을 등록해주세요</ST.Label>
                    <ST.Input
                        id="image"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageFileChange}
                        style={{ display: 'none' }}
                    />
                    <ST.ImgWrap>
                        <ST.ImgLabel htmlFor="image">
                            {!imgUrl && (
                                <>
                                    <p>
                                        <ST.FileSpan>파일 열기</ST.FileSpan> 혹은 끌어다 놓기
                                    </p>
                                    <ST.FileP>파일 형식은 jpg, jpeg, png만 업로드 가능합니다.</ST.FileP>
                                </>
                            )}
                            {imgUrl && <ST.Image src={imgUrl} alt="ShopImg" />}
                        </ST.ImgLabel>
                    </ST.ImgWrap>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 종류를 알려주세요</ST.Label>
                    <ST.SelectContainer>
                        <ST.Select name="shopType" value={shopRequestDto.shopType} onChange={handleChange}>
                            <ST.FirstOption value="">가게 종류를 선택해주세요</ST.FirstOption>
                            <option value="GROOMING">GROOMING</option>
                            <option value="HOSPITAL">HOSPITAL</option>
                            <option value="CAFE">CAFE</option>
                            <option value="ETC">ETC</option>
                        </ST.Select>
                    </ST.SelectContainer>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 이름을 알려주세요</ST.Label>
                    <ST.Input
                        name="shopName"
                        type="text"
                        value={shopRequestDto.shopName}
                        onChange={handleChange}
                        placeholder="업장 이름을 입력해주세요"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 위치를 알려주세요</ST.Label>
                    <ST.Input
                        name="shopAddress"
                        type="text"
                        value={shopRequestDto.shopAddress}
                        onChange={handleChange}
                        placeholder="우편번호"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 전화번호를 알려주세요</ST.Label>
                    <ST.NInputBox>
                        <ST.NInput name="firstN" type="text" value={firstN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={midNInput} name="midN" type="text" value={midN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={lastNInput} name="lastN" type="text" value={lastN} onChange={handleChange} />
                    </ST.NInputBox>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 영업시간을 알려주세요</ST.Label>
                    <ST.Input
                        name="shopTime"
                        type="text"
                        value={shopRequestDto.shopTime}
                        onChange={handleChange}
                        placeholder=""
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 한줄소개를 적어주세요</ST.Label>
                    <ST.Input
                        name="shopDescribe"
                        type="text"
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                        placeholder="한줄소개를 입력해주세요 (최대 300byte)"
                    />
                </ST.ShopInputBox>

                <ST.ShopBtn type="submit">수정하기</ST.ShopBtn>
                <ST.ShopBtn onClick={() => navigate(-1)}>취소</ST.ShopBtn>
            </ST.Form>
        </ST.Container>
    )
}

export default ShopsModify
