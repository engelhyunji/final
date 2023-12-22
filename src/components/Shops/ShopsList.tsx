import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as ST from './style'
import { Pagination, Button, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Shop, getShops } from '../../apis/api/api'
import { useQuery } from 'react-query'

const PetList: React.FC = () => {
    const navigate = useNavigate()
    const [shopList, setShopList] = useState<Shop[]>([])
    const [currentShops, setCurrentShops] = useState<Shop[]>([])

    const [page, setPage] = useState<number>(1)
    const shopsPerPage = 6
    const indexOfLastShop = page * shopsPerPage
    const indexOfFirstShop = indexOfLastShop - shopsPerPage
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
                    <ST.ShopDetailH2 className="mb-4">Shop</ST.ShopDetailH2>
                    <ST.ShopP>내 펫에게 딱 맞는 가게를 찾아 이용해보세요!</ST.ShopP>
                </ST.TitleBackContainer>


                <ST.ShopListH3>Shop 조회</ST.ShopListH3>
                <Row>
                    {currentShops.map((shop) => (
                        <Col key={shop.shopId} xs={12} sm={6} md={4} className="mb-4">
                            <ST.ShopBox className="card" onClick={() => navigate(`/shops/${shop.shopId}`)}>
                                <ST.thumImg
                                    src={shop.imageUrls[0]}
                                    className="card-img-top"
                                    alt={`${shop.shopName} img`}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{shop.shopName}</h5>
                                    <p className="card-text">영업시간 {shop.shopTime}</p>
                                    <p className="card-text">전화번호 {shop.shopTel}</p>
                                    <p className="card-text">위치 {shop.shopAddress}</p>
                                </div>
                            </ST.ShopBox>
                        </Col>
                    ))}
                </Row>

                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} />
                    {[...Array(Math.ceil(shopListLength / shopsPerPage))].map((_, i) => (
                        <Pagination.Item key={i} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(page + 1)} />
                </Pagination>

                <Link to="/shops">
                    <Button className="mt-3" style={{ backgroundColor: '#808080', border: 'none' }}>
                        my shop 추가하기
                    </Button>
                </Link>
            </Container>
        </ST.Container>
    )
}

export default PetList
