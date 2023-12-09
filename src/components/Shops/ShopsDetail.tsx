import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopDetails, getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'

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
            console.log('디테일 성공 data : ', data)
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
                            <img
                                src={detailShopData.shopResponseDto.imageUrls[0]}
                                alt={detailShopData.shopResponseDto.shopName}
                            />
                        </p>
                        <p>영업시간 : {detailShopData.shopResponseDto.shopTime}</p>
                        <p>연락처 : {detailShopData.shopResponseDto.shopTel}</p>
                        <p>소개 : {detailShopData.shopResponseDto.shopDescribe}</p>
                    </div>

                    <div className="grid-2">
                        <button onClick={() => navigate(`/shops/modify/${detailShopData.shopResponseDto.userId}`)}>
                            수정
                        </button>
                        <button onClick={() => navigate('/shopslist')}>목록으로</button>
                    </div>
                    <div>
                        <h3>후기</h3>
                        <ul>
                            {detailShopData.reviews.map((review, index) => (
                                <li key={index}>
                                    <p>작성자 : {review.nickname}</p>
                                    <p>{review.comment}</p>
                                    <p>추천수 : {review.likeCount}</p>
                                    <p>작성 날짜 : {review.createdAt}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div>가게 상세보기 에러</div>
            )}
        </div>
    )
}

export default ShopsDetail
