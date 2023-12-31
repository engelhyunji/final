import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
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
        shopStartTime: '',
        shopEndTime: '',
        shopTel1: '',
        shopTel2: '',
        shopTel3: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
    })

    const [imgUrl, setImgUrl] = useState<string | null>(null)
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const [initialDataLoaded, setInitialDataLoaded] = useState(false)

    const tel2Input = useRef<HTMLInputElement>(null)
    const tel3Input = useRef<HTMLInputElement>(null)

    useQuery(['detailShopData', Number(shopId)], () => getDetailShop(Number(shopId)), {
        onSuccess: (data) => {
            console.log('상품 디테일 불러오기 data', data?.shopResponseDto)
            // shopResponseDto(받은 값)에서 ShopPostData 형식으로 변환
            // 등록 및 수정에는 받은 데이터와 다른 형식으로 전달하기 때문
            const transformedShopData: ShopPostData | null = data?.shopResponseDto
                ? {
                      shopName: data.shopResponseDto.shopName,
                      shopStartTime: data.shopResponseDto.shopStartTime,
                      shopEndTime: data.shopResponseDto.shopEndTime,
                      shopTel1: data.shopResponseDto.shopTel1,
                      shopTel2: data.shopResponseDto.shopTel2,
                      shopTel3: data.shopResponseDto.shopTel3,
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

        if (name === 'shopTel1' || name === 'shopTel2' || name === 'shopTel3') {
            // 숫자만 최대 4자리 입력 정규식
            const telRegEx = /^[0-9\b -]{0,4}$/
            if (telRegEx.test(value)) {
                // 전화번호(shopTel) 각 부분 업데이트
                if (name === 'shopTel1' && value.length < 5) {
                    setShopRequestDto((prevData) => ({
                        ...prevData,
                        shopTel1: value,
                    }))
                    // 4자리도 입력 가능하지만 많은 경우인 3자리에서 포커스 이동
                    if (value.length === 3) tel2Input.current?.focus()
                }
                if (name === 'shopTel2') {
                    setShopRequestDto((prevData) => ({
                        ...prevData,
                        shopTel2: value,
                    }))
                    if (value.length === 4) tel3Input.current?.focus()
                }
                if (name === 'shopTel3') {
                    setShopRequestDto((prevData) => ({
                        ...prevData,
                        shopTel3: value,
                    }))
                }
            }
        } else {
            setShopRequestDto((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

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
    const handleDropdownChange = (value: string): void => {
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

        if (
            shopRequestDto.shopName.trim() === '' ||
            shopRequestDto.shopStartTime.trim() === '' ||
            shopRequestDto.shopEndTime.trim() === '' ||
            shopRequestDto.shopAddress.trim() === '' ||
            shopRequestDto.shopDescribe.trim() === '' ||
            shopRequestDto.shopTel1.trim() === '' ||
            shopRequestDto.shopTel2.trim() === '' ||
            shopRequestDto.shopTel3.trim() === '' ||
            shopRequestDto.shopType.trim() === ''
        ) {
            alert('정보를 모두 입력해주세요')
            return false
        } else {
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
                        <ST.NInput
                            name="shopTel1"
                            type="text"
                            value={shopRequestDto.shopTel1}
                            onChange={handleChange}
                        />
                        <ST.NSpan />
                        <ST.NInput
                            ref={tel2Input}
                            name="shopTel2"
                            type="text"
                            value={shopRequestDto.shopTel2}
                            onChange={handleChange}
                        />
                        <ST.NSpan />
                        <ST.NInput
                            ref={tel3Input}
                            name="shopTel3"
                            type="text"
                            value={shopRequestDto.shopTel3}
                            onChange={handleChange}
                        />
                    </ST.NnTInputBox>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 영업시간을 알려주세요</ST.Label>
                    <ST.NnTInputBox>
                        <ST.TInput
                            name="shopStartTime"
                            type="time"
                            value={shopRequestDto.shopStartTime}
                            onChange={handleChange}
                        />
                        <span> ~ </span>
                        <ST.TInput
                            name="shopEndTime"
                            type="time"
                            value={shopRequestDto.shopEndTime}
                            onChange={handleChange}
                        />
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
