import React, { useState, useEffect } from 'react'
import * as ST from './style'
import Slider from 'react-slick'
import instance from '../../../apis/instance'
import '../../../index.css'
import { Image } from '../../Pet/PetList/style'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
    const [selectedCategory, setSelectedCategory] = useState<ShopType>('GROOMING')

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await instance.get<{ result: ShopInfo[] }>('/api/shops')
                setShops(response.data.result || [])
                console.log('Fetched shops:', response.data.result)
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

    const handleCategoryClick = (category: ShopType) => {
        setSelectedCategory(category)
    }

    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dots: true,
        infinite: true,
        speed: 200,
        slidesToScroll: 1,
        slidesToShow: 3, // 한 번에 하나의 슬라이드만 보이도록 설정
        autoplay: true, // 자동 슬라이드 활성화
        autoplaySpeed: 1700, // 3초마다 슬라이드 넘김
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
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
                        <p>{category}</p>
                    </ST.CategoryItem>
                ))}
            </ST.CategoryList>
            {/* <ST.Text>선택 가게 업종: {selectedCategory}</ST.Text> */}
            <Slider {...settings}>
                {filteredShops.map((shop, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <ST.ShopCard>
                            {shop.imageUrls?.map((url, imgIdx) => (
                                <Image key={imgIdx} src={url} alt={`${shop.shopName} 이미지`} />
                            ))}
                            <p>가게: {shop.shopName}</p>
                            <p>업종: {shop.shopType}</p>
                            <p>주소: {shop.shopAddress}</p>
                        </ST.ShopCard>
                    </div>
                ))}
            </Slider>
        </ST.CategoryContainer>
    )
}

export default Category
