import React, { useState, ChangeEvent, FormEvent, useRef } from 'react'
import * as ST from './style'
import instance from '../../apis/instance'
import { useNavigate } from 'react-router-dom'
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

            // 전체 전화번호 조합 업데이트
            const tel = `${firstN}-${midN}-${lastN}`
            setShopRequestDto((prevData) => ({
                ...prevData,
                shopTel: tel,
            }))
        } else {
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

    return (
        <ST.Container>
            <BackWave />
            <ST.Text>Shop 등록하기</ST.Text>
            <ST.ShopP>사장님의 가게를 등록하고 더 많은 매칭 서비스를 이용해 보세요!</ST.ShopP>

            <ST.Form onSubmit={handleSubmit}>
                <ST.ShopInputBox>
                    <ST.Label>Shop 종류를 알려주세요</ST.Label>
                    <ST.SelectContainer>
                        <ST.Select name="shopType" value={shopRequestDto.shopType} onChange={handleChange}>
                            <ST.FirstOption value="">Shop 종류를 선택해주세요</ST.FirstOption>
                            <option value="GROOMING">GROOMING</option>
                            <option value="HOSPITAL">HOSPITAL</option>
                            <option value="CAFE">CAFE</option>
                            <option value="ETC">ETC</option>
                        </ST.Select>
                    </ST.SelectContainer>
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
                    <ST.NInputBox>
                        <ST.NInput name="firstN" type="text" value={firstN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={midNInput} name="midN" type="text" value={midN} onChange={handleChange} />
                        <ST.NSpan />
                        <ST.NInput ref={lastNInput} name="lastN" type="text" value={lastN} onChange={handleChange} />
                    </ST.NInputBox>
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 영업시간을 알려주세요</ST.Label>
                    <ST.Input
                        name="shopTime"
                        type="text"
                        value={shopRequestDto.shopTime}
                        onChange={handleChange}
                        placeholder=""
                    />
                </ST.ShopInputBox>

                <ST.ShopInputBox>
                    <ST.Label>Shop 한줄소개를 적어주세요</ST.Label>
                    <ST.Input
                        name="shopDescribe"
                        type="text"
                        value={shopRequestDto.shopDescribe}
                        onChange={handleChange}
                        placeholder="한줄소개를 입력해주세요 (최대 300byte)"
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
