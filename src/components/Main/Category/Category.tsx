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
    const [shops, setShops] = useState<ShopInfo[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('GROOMING')
    const navigate = useNavigate()

    const categories = [
        { displayName: '#애견 미용', value: 'GROOMING' },
        { displayName: '#동물병원', value: 'HOSPITAL' },
        { displayName: '#애견 카페', value: 'CAFE' },
        { displayName: '#기타', value: 'ETC' },
    ]

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await instance.get<{ result: ShopInfo[] }>('/api/shops')
                setShops(response.data.result || [])
                console.log('Shops:', response.data.result)
            } catch (error) {
                console.error('가게 정보를 불러오는데 실패했습니다.', error)
            }
        }

        fetchShops()
    }, [])

    useEffect(() => {
        console.log('Current shops state:', shops)
    }, [shops])

    const filteredShops = shops.filter((shop) => shop.shopType === selectedCategory)

    const handleCategoryClick = (categoryValue: ShopType) => {
        setSelectedCategory(categoryValue)
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
        autoplaySpeed: 3000,
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
                {categories.map((category, index) => (
                    <ST.CategoryItem
                        key={index}
                        $isSelected={category.value === (selectedCategory as string)}
                        onClick={() => handleCategoryClick(category.value as ShopType)}
                    >
                        <p>{category.displayName}</p>
                    </ST.CategoryItem>
                ))}
            </ST.CategoryList>
            <ST.ShopList>
                {shops.length > 0 && (
                    <Slider {...settings}>
                        {filteredShops.map((shop, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                                <ST.ShopCard
                                    onClick={() => navigate(`/shops/${shop.shopId}`)} // 상세 페이지로 이동
                                >
                                    {shop.imageUrls?.map((url, imgIdx) => (
                                        <Image key={imgIdx} src={url} alt={`${shop.shopName} 이미지`} />
                                    ))}
                                    <p>{shop.shopName}</p>
                                    <p>{shop.shopType==='ETC' ? '기타' : shop.shopType==='CAFE' ? '카페' : shop.shopType==='GROOMING'?'애견 미용' :'동물병원'}</p>
                                    <p>위치: {shop.shopAddress}</p>
                                </ST.ShopCard>
                            </div>
                        ))}
                    </Slider>
                )}
            </ST.ShopList>
        </ST.CategoryContainer>
    )
}

export default Category
