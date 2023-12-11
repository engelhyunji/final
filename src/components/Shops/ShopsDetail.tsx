import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as ST from './style'
import { ShopDetails, getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'
import Reviews from './Reviews/Reviews'

const ShopsDetail: React.FC = () => {
    const navigate = useNavigate()
    const { shopId } = useParams()
    const [detailShopData, setDetailShopData] = useState<ShopDetails | null>(null)

    const { data, isSuccess, isError } = useQuery(['detailShopData', Number(shopId)], () =>
        getDetailShop(Number(shopId)),
    )

    useEffect(() => {
        if (isSuccess && data) {
            setDetailShopData(data)
            console.log('디테일 쿼리 성공 data : ', data)
        }
    }, [isSuccess, data])

    if (isError) {
        console.log('디테일 에러 data : ', data)
        return <div>가게 상세보기 에러</div>
    }

    return (
        <div className="pet-detail">
            {detailShopData ? (
                <>
                    <h2>샵이름 {detailShopData.shopResponseDto.shopName}</h2>
                    <p>카테고리 : {detailShopData.shopResponseDto.shopType}</p>

                    <div className="pet-wrapper">
                        <p>
                            <ST.detailImg
                                src={detailShopData.shopResponseDto.imageUrls[0]}
                                alt={detailShopData.shopResponseDto.shopName}
                            />
                        </p>
                        <p>영업시간 : {detailShopData.shopResponseDto.shopTime}</p>
                        <p>연락처 : {detailShopData.shopResponseDto.shopTel}</p>
                        <p>소개 : {detailShopData.shopResponseDto.shopDescribe}</p>
                    </div>

                    <div className="grid-2">
                        <button onClick={() => navigate(`/shops/modify/${shopId}`)}>
                            수정
                        </button>
                        <button onClick={() => navigate('/shopslist')}>목록으로</button>
                    </div>
                    <Reviews detailShopData={detailShopData} />
                </>
            ) : (
                <div>가게 상세보기 에러</div>
            )}
        </div>
    )
}

export default ShopsDetail
