import instance from '../instance'
import { useState, useEffect } from 'react'

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
export const useFetchShops = (selectedCategory: ShopType) => {
    const [shops, setShops] = useState<ShopInfo[]>([])

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await instance.get<{ data: ShopInfo[] }>('/api/shops')

                // 응답 데이터가 올바른지 확인합니다.
                if (response.data && Array.isArray(response.data.data)) {
                    const filteredData = response.data.data.filter((shop) => shop.shopType === selectedCategory)
                    setShops(filteredData)
                } else {
                    // 응답 데이터가 올바르지 않은 경우, 빈 배열을 설정합니다.
                    setShops([])
                }
            } catch (error) {
                console.error('가게 정보를 불러오는데 실패했습니다.', error)
            }
        }

        fetchShops()
    }, [selectedCategory])

    return shops
}
