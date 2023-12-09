import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShopDetails, getDetailShop } from '../../apis/api/api'
import { useQuery } from 'react-query'



const ShopsDetail: React.FC = () => {
    const { shopId } = useParams()
    const [detailShopData, setDetailShopData] = useState<ShopDetails | null>(null)

    // const { data, isSuccess, isError } = useQuery(['detailShopData', shopId], ()=>getDetailShop(Number(shopId)));
    // if (isSuccess) {
    //     if (data) {
    //         setDetailShopData(data);
    //         console.log('디테일 성공 data : ', data);
    //     }
    // };

    // if (isError) {
    //     console.log('디테일 에러 data : ', data);
    //     return (
    //     <div>가게 상세보기 에러</div>
    //     )
    // };

    return (
        <div className="pet-detail">
            {detailShopData ? (
            <>
            <h2>{detailShopData.shopName}</h2>

            <div className="pet-wrapper">
                <div className="pet-header">
                    <p>ID: {detailShopData.userId}</p>
                </div>

                <div className="pet-content">
                    <p>Pet Name: {detailShopData.userId}</p>
                    <p>Image: {detailShopData.imageUrl}</p>
                </div>
            </div>

            <div className="grid-2">
                <Link to={`/pet/modify/${detailShopData.userId}`}>
                    <button>Modify</button>
                </Link>
                <Link to="/pets">
                    <button>목록으로</button>
                </Link>
            </div>
            </>
        ) : (
            <div>가게 상세보기 에러</div>
        )}
        </div>
    )
}

export default ShopsDetail
