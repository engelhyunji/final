import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import BackWave from '../BackWave'

export interface ShopPostData {
    shopName: string
    shopStartTime: string
    shopEndTime: string
    shopTel1: string
    shopTel2: string
    shopTel3: string
    // shopTime: string
    // shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    // shopTags: string[]
}

const Shops: React.FC = () => {
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
        // shopTags: [],
    })

    const describeLimit: number = 100

    const [imgUrl, setImgUrl] = useState<string>('')
    const [uploadImage, setUploadImage] = useState<File>(new File([], ''))

    const tel2Input = useRef<HTMLInputElement>(null)
    const tel3Input = useRef<HTMLInputElement>(null)

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
            if (name === 'shopName' && value.length > 20) {
                return
            }
            if (name === 'shopAddress' && value.length > 30) {
                return
            }
            if (name === 'shopDescribe' && value.length > 100) {
                return
            }
            setShopRequestDto((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            // console.log('e.target.files[0] 파일확인', e.target.files[0])
            const reader = new FileReader()
            reader.onload = () => {
                const result = reader.result as string

                // 이미지 업데이트
                setImgUrl(result)
                setUploadImage(file)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }
    // useEffect(() => {
    //     console.log('uploadImage 업데이트 확인', uploadImage)
    // }, [uploadImage])

    // shopType (드롭다운 토글 값) 업데이트
    const handleDropdownChange = (value: string): void => {
        setShopRequestDto((prevData) => ({
            ...prevData,
            shopType: value,
        }))
    }

    // 등록하기
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()
        // 이미지 외 데이터
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
                const response = await instance.post(`/api/shops`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                console.log('가게 등록 response :', response.data)
                navigate('/shopslist')
            } catch (error: any) {
                if (error.response.data.code === 4506) {
                    alert(error.response.data.message)
                }
                console.error('가게 등록 에러 :', error)
            }
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>가게 등록하기</ST.Text>
            <ST.ShopP>사장님의 가게를 등록하고 더 많은 매칭 서비스를 이용해 보세요!</ST.ShopP>

            <ST.Form onSubmit={handleSubmit}>
                {/* <ST.ShopInputBox>
                    <ST.Label>Shop 관련 키워드 #해시태그</ST.Label>
                    <ST.Input
                        name="shopTags"
                        type="text"
                        value={shopRequestDto.shopTags}
                        onChange={handleChange}
                        placeholder="해시태그 추가"
                    />
                </ST.ShopInputBox> */}

                <ST.ShopInputBox>
                    <ST.Label>가게 종류를 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {shopRequestDto.shopType || '가게 종류를 선택해주세요'}
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
                    <ST.Label>가게 이름을 알려주세요</ST.Label>
                    <ST.Input
                        name="shopName"
                        type="text"
                        value={shopRequestDto.shopName}
                        onChange={handleChange}
                        placeholder="가게 이름을 입력해주세요"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 위치를 알려주세요</ST.Label>
                    <ST.Input
                        name="shopAddress"
                        type="text"
                        value={shopRequestDto.shopAddress}
                        onChange={handleChange}
                        placeholder="도로명 주소"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>가게 전화번호를 알려주세요</ST.Label>
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
                    <ST.Label>가게 영업시간을 알려주세요</ST.Label>
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
                    <ST.Label>가게 소개를 적어주세요</ST.Label> <ST.desLimit>{shopRequestDto.shopDescribe.length}/{describeLimit}</ST.desLimit>
                    <ST.DescInput
                        name="shopDescribe"
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                        placeholder="가게 소개를 입력해주세요"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>사진을 등록해주세요</ST.Label>
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

                <ST.ShopBtn type="submit">입력완료</ST.ShopBtn>
            </ST.Form>
        </ST.Container>
    )
}

export default Shops
