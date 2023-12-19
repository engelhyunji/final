import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as ST from './style'
import { Pagination, Table, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Shop, getShops } from '../../apis/api/api'
import { useQuery } from 'react-query'

const PetList: React.FC = () => {
    const navigate = useNavigate();
    const [shopList, setShopList] = useState<Shop[]>([])
    const [currentShops, setCurrentShops] = useState<Shop[]>([])
    const [page, setPage] = useState<number>(1)
    const shopsPerPage = 5
    const indexOfLastShop = page * shopsPerPage
    const indexOfFirstShop = indexOfLastShop - shopsPerPage
    const shopListLength = shopList.length

    const handlePageChange = (page: number) => {
        setPage(page)
    }

    useQuery('getShops', getShops, {
        onSuccess: (data) => {
            if (data) {
                setShopList([...data]);
                console.error('있으면 반환된 data', data);
            } else { // 반환된 데이터가 배열이 아니거나 null/undefined
                console.error('실패 시 data', data);
            }
        },
        onError: (error) => {
            console.error('getShops 에러 :', error);
        }
    })

    useEffect(() => {
        const reversedShops = [...shopList].reverse()

        setCurrentShops(reversedShops.slice(indexOfFirstShop, indexOfLastShop))
    }, [shopList, page])

    return (
        <Container className="shop-list">
            <h2 className="mb-4">Shop 전체보기</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>뷰</th>
                        <th>shopId (확인용)</th>
                        <th>Shop 이름</th>
                        <th>위치</th>
                    </tr>
                </thead>
                <tbody>
                    {currentShops.map((shop, index) => (
                        <tr key={index} onClick={()=>navigate(`/shops/${shop.shopId}`)}>
                            <td><ST.thumImg src={shop.imageUrls[0]} alt={`${shop.shopName} img`}/></td>
                            <td>{shop.shopId}</td>
                            <td className="shop-name">{shop.shopName}</td>
                            <td>{shop.shopAddress}</td> 
                        </tr>
                    ))}
                </tbody>
            </Table>

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
    )
}

export default PetList
