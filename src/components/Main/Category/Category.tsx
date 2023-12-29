import React, { useState, useEffect } from 'react'
import * as ST from './style'
import Slider from 'react-slick'
import instance from '../../../apis/instance'
import '../../../index.css'
import { Image } from '../../Pet/PetList/style'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'

type ShopType = 'GROOMING' | 'HOSPITAL' | 'CAFE' | 'ETC'

interface ShopInfo {
    shopId?: number
    userId?: number
    shopName?: string
    shopTime?: string
    shopTel?: string
    shopAddress?: string
    shopType?: ShopType
    shopDescribe?: string
    imageUrls?: string[]
}

const Category: React.FC = () => {
    const navigate = useNavigate()

    const [shops, setShops] = useState<ShopInfo[]>([])
    const [selectedCategory, setSelectedCategory] = useState<ShopType>('GROOMING')

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await instance.get<{ result: ShopInfo[] }>('/api/shops')
                setShops(response.data.result || [])
                // console.log('Fetched shops:', response.data.result)
            } catch (error) {
                console.error('가게 정보를 불러오는데 실패했습니다.', error)
            }
        }

        fetchShops()
    }, [])

    // useEffect(() => {
    //     console.log('Current shops state:', shops)
    // }, [shops])

    const filteredShops = shops.filter((shop) => shop.shopType === selectedCategory).reverse()

    const handleCategoryClick = (category: ShopType) => {
        setSelectedCategory(category)
    }

    // 'infinite' 속성을 'filteredShops'의 길이에 따라 조정
    const isSliderInfinite = filteredShops.length > 3

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        // infinite: filteredShops.length > 3,
        infinite: isSliderInfinite,
        speed: 100,
        slidesToScroll: 1,
        slidesToShow: Math.min(3, filteredShops.length),
        autoplay: true,
        autoplaySpeed: 1300,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(1, filteredShops.length),
                    slidesToScroll: 1,
                    infinite: filteredShops.length > 1,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: Math.min(1, filteredShops.length),
                    slidesToScroll: 1,
                    infinite: filteredShops.length > 1,
                },
            },
        ],
    }

    // const groupedShops = filteredShops.reduce<ShopInfo[][]>((result, _value, index, array) => {
    //     if (index % 3 === 0) {
    //         result.push(array.slice(index, index + 3))
    //     }
    //     return result
    // }, [])

    interface ArrowProps {
        className?: string
        style?: React.CSSProperties
        onClick?: React.MouseEventHandler<HTMLDivElement>
    }

    function SampleNextArrow(props: ArrowProps) {
        const { className, style, onClick } = props
        return <ST.Arrow className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
    }

    function SamplePrevArrow(props: ArrowProps) {
        const { className, style, onClick } = props
        return <ST.Arrow className={className} style={{ ...style, display: 'block' }} onClick={onClick} />
    }

    return (
        <ST.CategoryContainer>
            <ST.CategoryList>
                {['GROOMING', 'HOSPITAL', 'CAFE', 'ETC'].map((category, index) => (
                    <ST.CategoryItem
                        key={index}
                        $isSelected={category === selectedCategory}
                        onClick={() => handleCategoryClick(category as ShopType)}
                    >
                        <p>#{category}</p>
                    </ST.CategoryItem>
                ))}
            </ST.CategoryList>
            <ST.ShopSlideBox>
                <ST.TextWrapper
                    onClick={() => {
                        navigate('/shopslist')
                    }}
                >
                    <ST.ShopSlideP>Shop</ST.ShopSlideP>
                    <ST.ShopSlideP2>
                        실시간으로 뜨는 <br /> 곳들을 보여드려요
                    </ST.ShopSlideP2>
                    <ST.ShopSlideP2>더보기 ⇀</ST.ShopSlideP2>
                </ST.TextWrapper>
                <ST.ShopSlide>
                    {shops.length > 0 && (
                        <Slider {...settings}>
                            {filteredShops.map((shop, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ST.ShopCard
                                        onClick={() => {
                                            navigate(`/shops/${shop.shopId}`)
                                        }}
                                    >
                                        {shop.imageUrls?.map((url, imgIdx) => (
                                            <Image key={imgIdx} src={url} alt={`${shop.shopName} 이미지`} />
                                        ))}
                                        <ST.ShopInfo>
                                            <p>{shop.shopName}</p>
                                            {/* <p>업종: {shop.shopType}</p> */}
                                            <p>{shop.shopAddress}</p>
                                        </ST.ShopInfo>
                                    </ST.ShopCard>
                                </div>
                            ))}
                        </Slider>
                    )}
                </ST.ShopSlide>
            </ST.ShopSlideBox>
        </ST.CategoryContainer>
    )
}

export default Category
