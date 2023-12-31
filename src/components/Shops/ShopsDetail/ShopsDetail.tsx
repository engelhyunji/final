import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as ST from './style'
import { MdOutlineCategory } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { ShopDetails, getDetailShop } from '../../../apis/api/api'
import { useQuery } from 'react-query'
import Reviews, { mainColor } from '../Reviews/Reviews'

const ShopsDetail: React.FC = () => {
    const { shopId } = useParams()
    const [detailShopData, setDetailShopData] = useState<ShopDetails | null>(null)

    const { data, isSuccess, isError } = useQuery(['detailShopData', Number(shopId)], () =>
        getDetailShop(Number(shopId)),
    )

    useEffect(() => {
        if (isSuccess && data) {
            setDetailShopData(data)
            // console.log('디테일 쿼리 성공 data : ', data)
        }
    }, [isSuccess, data])

    if (isError) {
        console.log('디테일 에러 data : ', data)
        return <div>가게 상세보기 에러</div>
    }

    return (
        <ST.ShopDetailContainer>

            {detailShopData ? (
                <>
                    <div>
                        <ST.ShopImgBox>
                            <ST.detailImg
                                src={detailShopData.shopResponseDto.imageUrls[0]}
                                alt={detailShopData.shopResponseDto.shopName}
                            />
                            <ST.ShopImgInfo>
                                <ST.ShopNameH2>{detailShopData.shopResponseDto.shopName}</ST.ShopNameH2>
                                <ST.ShopInfoP>{detailShopData.shopResponseDto.shopDescribe}</ST.ShopInfoP>
                            </ST.ShopImgInfo>
                        </ST.ShopImgBox>

                        <ST.ShopCategoryUl>
                            <ST.ShopCategoryLi>
                                <ST.ShopInfo><MdOutlineCategory style={mainColor}/> 업종</ST.ShopInfo>
                                <ST.ShopInfoContent>{detailShopData.shopResponseDto.shopType}</ST.ShopInfoContent>
                            </ST.ShopCategoryLi>
                            <ST.ShopCategoryLi>
                                <ST.ShopInfo><IoLocationOutline style={mainColor}/> 위치</ST.ShopInfo>
                                <ST.ShopInfoContent>{detailShopData.shopResponseDto.shopAddress}</ST.ShopInfoContent>
                            </ST.ShopCategoryLi>
                            <ST.ShopCategoryLi>
                                <ST.ShopInfo><IoTimeOutline style={mainColor}/> 영업시간</ST.ShopInfo>
                                <ST.ShopInfoContent>{detailShopData.shopResponseDto.shopStartTime} ~ {detailShopData.shopResponseDto.shopStartTime}</ST.ShopInfoContent>
                            </ST.ShopCategoryLi>
                            <ST.ShopCategoryLi>
                                <ST.ShopInfo><FiPhone style={mainColor}/> 전화번호</ST.ShopInfo>
                                <ST.ShopInfoContent>{detailShopData.shopResponseDto.shopTel1} - {detailShopData.shopResponseDto.shopTel2} - {detailShopData.shopResponseDto.shopTel3}</ST.ShopInfoContent>
                            </ST.ShopCategoryLi>
                        </ST.ShopCategoryUl>
                    </div>

                    <Reviews detailShopData={detailShopData} />
                </>
            ) : (
                <div>Shop 상세정보가 없습니다. 데이터 로드 에러</div>
            )}
        </ST.ShopDetailContainer>
    )
}

export default ShopsDetail
