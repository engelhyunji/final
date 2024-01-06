import React, { useState, ChangeEvent, FormEvent, useRef, useEffect, useCallback } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap'
import BackWave from '../BackWave'
import _ from 'lodash'

export interface ShopPostData {
    shopName: string
    shopStartTime: string
    shopEndTime: string
    shopTel1: string
    shopTel2: string
    shopTel3: string
    shopAddress: string
    shopType: string
    shopDescribe: string
    latitude: number // 추가된 필드
    longitude: number // 추가된 필드
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
        latitude: 0,
        longitude: 0,
    })

    const describeLimit: number = 100
    const [imgUrl, setImgUrl] = useState<string>('')
    const [uploadImage, setUploadImage] = useState<File>(new File([], ''))
    const tel2Input = useRef<HTMLInputElement>(null)
    const tel3Input = useRef<HTMLInputElement>(null)

    const convertAddressToCoords = async (address: string): Promise<{ latitude: number; longitude: number }> => {
        return new Promise((resolve, reject) => {
            const geocoder = new window.kakao.maps.services.Geocoder()
            geocoder.addressSearch(address, function (result, status) {
                if (status === window.kakao.maps.services.Status.OK && result[0]) {
                    const latitude = parseFloat(result[0].y)
                    const longitude = parseFloat(result[0].x)
                    resolve({ latitude, longitude })
                } else {
                    reject(new Error(`주소 변환 실패: ${address}`))
                }
            })
        })
    }

    useEffect(() => {
        const script = document.createElement('script')
        script.async = true
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=30e58bfb3907dffb16196ae237d38d8&libraries=services`
        document.head.appendChild(script)

        script.onload = () => {
            // 스크립트 로드 완료 후 kakao.maps 서비스를 사용할 수 있음
        }
    }, [])

    // 주소 검색 디바운스 적용
    const delayedQuery = useCallback(
        _.debounce(async (q: string) => {
            try {
                const coords = await convertAddressToCoords(q)
                console.log('변환된 좌표:', coords) // 콘솔에서 확인
                setShopRequestDto((prevData) => ({
                    ...prevData,
                    shopAddress: q,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }))
            } catch (error) {
                console.error('주소 변환 에러:', error)
                alert('주소 변환에 실패했습니다. 정확한 주소를 입력해주세요.')
            }
        }, 1000),
        [],
    )

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
        } else if (name === 'shopAddress') {
            setShopRequestDto((prevData) => ({
                ...prevData,
                [name]: value,
            }))
            delayedQuery(value)
        } else {
            // 가게 이름, 위치, 설명 - 글자 수 제한
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

    // 이미지 드래그 앤 드롭
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.border = '2px solid #00BD8e'
    }
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.currentTarget.style.border = 'none'
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0]
            setUploadImage(file)
            const reader = new FileReader()
            reader.onloadend = () => setImgUrl(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

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

        // 빈 값 체크
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
                const response = await instance.post(`/api/shops`, FormData, {
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

        try {
            const formData = new FormData()
            // 기존 데이터 추가
            Object.entries(shopRequestDto).forEach(([key, value]) => {
                formData.append(key, value.toString())
            })

            // 이미지 파일 추가
            if (uploadImage) {
                formData.append('imageUrl', uploadImage)
            }

            // 요청 전송
            const response = await instance.post(`/api/shops`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log('가게 등록 response:', response.data)
            navigate('/shopslist')
        } catch (error: any) {
            if (error.response.data.code === 4506) {
                alert(error.response.data.message)
            }
            console.error('가게 등록 에러 :', error)
        }
    }

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>가게 등록하기</ST.Text>
            <ST.ShopP>사장님의 가게를 등록하고 더 많은 매칭 서비스를 이용해 보세요!</ST.ShopP>

            <ST.Form onSubmit={handleSubmit}>
                <ST.ShopInputBox>
                    <ST.Label>가게 종류를 알려주세요</ST.Label>
                    <ST.StDropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {shopRequestDto.shopType === 'GROOMING' && '애견 미용'}
                            {shopRequestDto.shopType === 'HOSPITAL' && '동물병원'}
                            {shopRequestDto.shopType === 'CAFE' && '애견 카페'}
                            {shopRequestDto.shopType === 'ETC' && '기타'}
                            {!shopRequestDto.shopType && '가게 종류를 선택해주세요'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleDropdownChange('GROOMING')}>애견 미용</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('HOSPITAL')}>동물병원</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('CAFE')}>애견 카페</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDropdownChange('ETC')}>기타</Dropdown.Item>
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
                    <ST.Label>가게 소개를 적어주세요</ST.Label>{' '}
                    <ST.desLimit>
                        {shopRequestDto.shopDescribe.length}/{describeLimit}
                    </ST.desLimit>
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
                    <ST.ImgWrap onDragOver={handleDragOver} onDrop={handleDrop}>
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
