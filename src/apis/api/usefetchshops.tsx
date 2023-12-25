// Main Page Category Shops
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

                if (response.data && Array.isArray(response.data.data)) {
                    const filteredData = response.data.data.filter((shop) => shop.shopType === selectedCategory)
                    setShops(filteredData)
                } else {
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
