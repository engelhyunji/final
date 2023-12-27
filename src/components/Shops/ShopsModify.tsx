import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopPostData } from './Shops'
import { getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'
import BackWave from '../BackWave'
import { Dropdown } from 'react-bootstrap'

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
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const [initialDataLoaded, setInitialDataLoaded] = useState(false)

    // 전화번호(shopTel) 각 부분
    const [firstN, setFirstN] = useState<string>('')
    const [midN, setMidN] = useState<string>('')
    const [lastN, setLastN] = useState<string>('')
    const midNInput = useRef<HTMLInputElement>(null)
    const lastNInput = useRef<HTMLInputElement>(null)

    // 영업시간(shopTime) 각 부분
    const [openTime, setOpenTime] = useState<string>('')
    const [closeTime, setCloseTime] = useState<string>('')

    useQuery(['detailShopData', Number(shopId)], () => getDetailShop(Number(shopId)), {
        onSuccess: (data) => {
            console.log('상품 디테일 불러오기 data', data?.shopResponseDto)
            // shopResponseDto(받은 값)에서 ShopPostData 형식으로 변환
            // 등록 및 수정에는 받은 데이터와 다른 형식으로 전달하기 때문
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
            // 기존 데이터 담기
            if (transformedShopData) {
                // 초기에만 기존값이 담기도록
                if (!initialDataLoaded) {
                    // 이미지 URL 담기
                    if (data?.shopResponseDto?.imageUrls) {
                        setImgUrl(data?.shopResponseDto?.imageUrls)
                    }

                    setShopRequestDto(transformedShopData)

                    // shopTel 각 부분 분리 후 담기
                    const telParts = transformedShopData.shopTel.split('-')
                    setFirstN(telParts[0] || '')
                    setMidN(telParts[1] || '')
                    setLastN(telParts[2] || '')

                    const timeParts = transformedShopData.shopTime.split(' ~ ')
                    setOpenTime(timeParts[0] || '')
                    setCloseTime(timeParts[1] || '')

                    // 기존값 담은 후에는 상태변경하여 기존값 다시 들어오지 않게
                    setInitialDataLoaded(true)
                }
            }
        },
    })
    // useEffect(() => {
    //     console.log('setShopRequestDto', shopRequestDto)
    // }, [shopRequestDto])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        // 오픈시간 마감시간 각 업데이트
        } else if (name === 'openTime' || name === 'closeTime') {
            if (name === 'openTime') setOpenTime(value)
            if (name === 'closeTime') setCloseTime(value)
            
        } else {
            setShopRequestDto((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

        useEffect(() => {
        // 컴포넌트가 렌더링된 후에 실행되어 최신입력값 적용되게
        // 전체 전화번호 조합 업데이트
        const tel = `${firstN}-${midN}-${lastN}`
        setShopRequestDto((prevData) => ({
            ...prevData,
            shopTel: tel,
        }))
    }, [firstN, midN, lastN])

    useEffect(() => {
        // 컴포넌트가 렌더링된 후에 실행되어
        // openTime, closeTime 업데이트된 후에 setShopRequestDto 호출되도록
        // 전체 영업시간 업데이트
        const time = `${openTime} ~ ${closeTime}`
        setShopRequestDto((prevData) => ({
            ...prevData,
            shopTime: time,
        }))
    }, [openTime, closeTime])

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setUploadImage(e.target.files[0])
            const reader = new FileReader()
            reader.onload = () => {
                setImgUrl(reader.result as string)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    // shopType (드롭다운 토글 값) 업데이트
    const handleDropdownChange = (value: string) : void => {
        setShopRequestDto((prevData) => ({
            ...prevData,
            shopType: value,
        }))
    }

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
            console.log('가게 수정 response :', response.data)
            navigate(-1)
        } catch (error) {
            console.error('가게 수정 에러 :', error)
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>Shop 수정하기</ST.Text>
            <ST.ShopP>사장님의 등록된 Shop 정보를 수정해주세요!</ST.ShopP>

            <ST.Form onSubmit={handleSubmit}>
                <ST.ShopInputBox>
                    <ST.Label>Shop 종류를 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {shopRequestDto.shopType || 'Shop 종류를 선택해주세요'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDropdownChange('GROOMING')}>GROOMING</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('HOSPITAL')}>HOSPITAL</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('CAFE')}>CAFE</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('ETC')}>ETC</Dropdown.Item>
                        </Dropdown.Menu>
                    </ST.StDropdown>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 이름을 알려주세요</ST.Label>
                    <ST.Input
                        name="shopName"
                        type="text"
                        value={shopRequestDto.shopName}
                        onChange={handleChange}
                        placeholder="업장 이름을 입력해주세요"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 위치를 알려주세요</ST.Label>
                    <ST.Input
                        name="shopAddress"
                        type="text"
                        value={shopRequestDto.shopAddress}
                        onChange={handleChange}
                        placeholder="우편번호"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 전화번호를 알려주세요</ST.Label>
                    <ST.NnTInputBox>
                        <ST.NInput name="firstN" type="text" value={firstN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={midNInput} name="midN" type="text" value={midN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={lastNInput} name="lastN" type="text" value={lastN} onChange={handleChange} />
                    </ST.NnTInputBox>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 영업시간을 알려주세요</ST.Label>
                    <ST.NnTInputBox>
                        <ST.TInput name="openTime" type="time" value={openTime} onChange={handleChange} />
                        <span> ~ </span>
                        <ST.TInput name="closeTime" type="time" value={closeTime} onChange={handleChange} />
                    </ST.NnTInputBox>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 한줄소개를 적어주세요</ST.Label>
                    <ST.DescInput
                        name="shopDescribe"
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                        placeholder="Shop 소개를 입력해주세요"
                    />
                </ST.ShopInputBox>

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

                <ST.ShopBtnBox>
                    <ST.ShopModifyBtn onClick={() => navigate(-1)}>취소</ST.ShopModifyBtn>
                    <ST.ShopModifyBtn type="submit">수정완료</ST.ShopModifyBtn>
                </ST.ShopBtnBox>
            </ST.Form>
        </ST.Container>
    )
}

export default ShopsModify
