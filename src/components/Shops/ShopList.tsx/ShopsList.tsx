import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as ST from './style'
import * as StP from './pageStyle'
import { Pagination, Container, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Shop, getShops } from '../../../apis/api/api'
import { useQuery } from 'react-query'

const ShopsList: React.FC = () => {
    const navigate = useNavigate()

    // 서버에서 받은 전체 목록
    const [shopList, setShopList] = useState<Shop[]>([])
    // 페이지네이션을 통해 보여줄 목록
    const [currentShops, setCurrentShops] = useState<Shop[]>([])
    // 현재 페이지 번호
    const [page, setPage] = useState<number>(1)
    // 페이지 당 목록 개수
    const shopsPerPage: number = 6
    const indexOfLastShop: number = page * shopsPerPage
    const indexOfFirstShop: number = indexOfLastShop - shopsPerPage
    const shopListLength = shopList.length

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    useQuery('getShops', getShops, {
        onSuccess: (data) => {
            if (data) {
                setShopList([...data])
                // console.error('있으면 반환된 data', data);
            } else {
                // 반환된 데이터가 배열이 아니거나 null/undefined일 때
                console.error('실패 시 data', data)
            }
        },
        onError: (error) => {
            console.error('getShops 에러 :', error)
        },
    })

    useEffect(() => {
        const reversedShops = [...shopList].reverse()

        setCurrentShops(reversedShops.slice(indexOfFirstShop, indexOfLastShop))
    }, [shopList, page])

    return (
        <ST.Container>
            <Container className="shop-list">
                <ST.TitleBackContainer>
                    <ST.ShopListH2 className="mb-4">Shop</ST.ShopListH2>
                    <ST.ShopP>내 펫에게 딱 맞는 가게를 찾아 이용해보세요!</ST.ShopP>
                </ST.TitleBackContainer>

                <ST.ShopListH3>Shop 조회</ST.ShopListH3>


                <ST.StRow>
                    {currentShops.map((shop) => (
                        <Col key={shop.shopId} xs={12} sm={6} md={4} className="mb-4">
                            <ST.ShopBox className="card" onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                <ST.thumImg
                                    src={shop.imageUrls[0]}
                                    className="card-img-top"
                                    alt={`${shop.shopName} img`}
                                />
                                <ST.CardBodyDiv className="card-body">
                                    <ST.ShopListH4 className="card-title">{shop.shopName}</ST.ShopListH4>
                                    <ST.ShopGrid>
                                        <ST.BodyTimeP className="card-text">영업시간</ST.BodyTimeP>
                                        <ST.BodyTimeInfoP className="card-text">{shop.shopTime}</ST.BodyTimeInfoP>
                                        <ST.BodyTelP className="card-text">전화번호</ST.BodyTelP>
                                        <ST.BodyTelInfoP className="card-text">{shop.shopTel}</ST.BodyTelInfoP>
                                        <ST.BodyAddressP className="card-text">위치</ST.BodyAddressP>
                                        <ST.BodyAddressInfoP className="card-text">
                                            {shop.shopAddress}
                                        </ST.BodyAddressInfoP>
                                        <ST.CardBodyP className="card-text">#해쉬태그예정 #hashtag</ST.CardBodyP>
                                    </ST.ShopGrid>
                                </ST.CardBodyDiv>
                            </ST.ShopBox>
                        </Col>
                    ))}
                </ST.StRow>

                <StP.pageContainer>
                    {/* 첫페이지에서는 < Prev 버튼 안보이게 */}
                    {page !== 1 && <Pagination.Prev onClick={() => handlePageChange(page - 1)} />}

                    {[...Array(Math.ceil(shopListLength / shopsPerPage))].map((_, i) => (
                        <Pagination.Item key={i} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}

                    {/* 마지막 페이지가 아닐 때만 > Next 버튼 보이게 */}
                    {page !== Math.ceil(shopListLength / shopsPerPage) && (
                        <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                    )}
                </StP.pageContainer>
            </Container>
        </ST.Container>
    )
}

export default ShopsList