import React, { useState, ChangeEvent, FormEvent, useRef, useEffect } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import BackWave from '../BackWave'

export interface ShopPostData {
    shopName: string
    shopTime: string
    shopTel: string
    shopAddress: string
    shopType: string
    shopDescribe: string
}

const Shops: React.FC = () => {
    const navigate = useNavigate()
    const [shopRequestDto, setShopRequestDto] = useState<ShopPostData>({
        shopName: '',
        shopTime: '',
        shopTel: '',
        shopAddress: '',
        shopType: '',
        shopDescribe: '',
    })

    const [imgUrl, setImgUrl] = useState<string>('')
    const [uploadImage, setUploadImage] = useState<File>(new File([], ''))

    // 전화번호(shopTel) 각 부분
    const [firstN, setFirstN] = useState<string>('')
    const [midN, setMidN] = useState<string>('')
    const [lastN, setLastN] = useState<string>('')
    const midNInput = useRef<HTMLInputElement>(null)
    const lastNInput = useRef<HTMLInputElement>(null)

    // 영업시간(shopTime) 각 부분
    const [openTime, setOpenTime] = useState<string>('')
    const [closeTime, setCloseTime] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        if (name === 'firstN' || name === 'midN' || name === 'lastN') {
            // 숫자만 최대 4자리 입력 정규식
            const telRegEx = /^[0-9\b -]{0,4}$/
            if (telRegEx.test(value)) {
                // 전화번호(shopTel) 각 부분 업데이트
                if (name === 'firstN' && value.length < 5) {
                    setFirstN(value)
                    // 4자리도 입력 가능하지만 많은 경우인 3자리에서 포커스 이동
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
            shopRequestDto.shopName === " " ||
            shopRequestDto.shopTel === " " ||
            shopRequestDto.shopAddress === " " ||
            shopRequestDto.shopDescribe === " " ||
            shopRequestDto.shopTime === " " ||
            shopRequestDto.shopType === " "
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
            } catch (error) {
                console.error('가게 등록 에러 :', error)
            }
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>Shop 등록하기</ST.Text>
            <ST.ShopP>사장님의 가게를 등록하고 더 많은 매칭 서비스를 이용해 보세요!</ST.ShopP>

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
                        placeholder="Shop 이름을 입력해주세요"
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 위치를 알려주세요</ST.Label>
                    <ST.Input
                        name="shopAddress"
                        type="text"
                        value={shopRequestDto.shopAddress}
                        onChange={handleChange}
                        placeholder="도로명 주소"
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
                    <ST.Label>Shop 소개를 적어주세요</ST.Label>
                    <ST.DescInput
                        name="shopDescribe"
                        // rows={10}
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                        placeholder="Shop 소개를 입력해주세요"
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
