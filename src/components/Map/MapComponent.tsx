import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk';
import * as ST from './style';
import instance from '../../apis/instance';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

export interface ShopPostData {
    shopId: number;
    userId: number;
    shopName: string;
    shopStartTime: string;
    shopEndTime: string;
    shopTel1: string;
    shopTel2: string;
    shopTel3: string;
    shopAddress: string;
    shopType: string;
    shopDescribe: string;
    latitude: number;
    longitude: number;
    imageUrls: string[];
}

// const customModalStyles = {
//     overlay: {
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         zIndex: 1000,
//     },
//     content: {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: '80%',
//         height: 'auto',
//         overflow: 'auto',
//         backgroundColor: 'white',
//         border: '1px solid #ccc',
//         borderRadius: '7px',
//         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//         zIndex: 1001,
//     },
// };

Modal.setAppElement('#root');

interface MapComponentProps {
    coords: { lat: number; lng: number };
}

const MapComponent: React.FC<MapComponentProps> = ({ coords }) => {
    const [info, setInfo] = useState<ShopPostData | null>(null);
    const [markers, setMarkers] = useState<ShopPostData[]>([]);
    const [keyword, setKeyword] = useState('');
    const [message, setMessage] = useState('');
    const [selectedPlaceIndex, setSelectedPlaceIndex] = useState<number | null>(null);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [placesPerPage] = useState(3);
    const map = useRef<any>(null); // Changed the type to 'any' to address the panTo error
    const navigate = useNavigate();

    const defaultCoords = { lat: 37.5665, lng: 126.978 };

    const navigateToShopList = () => {
        navigate('/shopslist');
    };

    const initializeMap = () => {
        const container = map.current;
        if (!container) return;

        const options = {
            center: new window.kakao.maps.LatLng(coords.lat || defaultCoords.lat, coords.lng || defaultCoords.lng),
            level: 3,
        };
        map.current = new window.kakao.maps.Map(container, options);
    };

    const searchPlaces = async () => {
        if (!keyword.trim()) {
            alert('가게목록을 조회하시고 검색어를 입력해주세요!');
            return;
        }

        try {
            const response = await instance.get(`/api/shops?keyword=${encodeURIComponent(keyword)}`);
            if (response.status === 200) {
                const shopsData: ShopPostData[] = response.data.result;
                // 필터링된 데이터만 마커로 표시
                const filteredMarkers = shopsData.filter(
                    (shop) => shop.shopName.includes(keyword) || shop.shopAddress.includes(keyword)
                );
                setMarkers(filteredMarkers);
                setMessage('');
            } else {
                console.error('가게 데이터 가져오기 오류:', response.statusText);
            }
        } catch (error) {
            console.error('가게 데이터 가져오기 오류:', error);
        }
    };

    const handleListItemClick = (marker: ShopPostData, index: number) => {
        // setIsModalOpen(true);
        setInfo(marker);
        setSelectedPlaceIndex(index);

        if (map.current) {
            map.current.panTo(
                new window.kakao.maps.LatLng(
                    marker.latitude ?? defaultCoords.lat,
                    marker.longitude ?? defaultCoords.lng
                )
            );
        }
    };

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            initializeMap();
        } else {
            const script = document.createElement('script');
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=30e58bfb3907dffb16196ae237d38d8&libraries=services';
            document.head.appendChild(script);

            script.onload = () => {
                initializeMap();
            };

            const fetchShops = async () => {
                try {
                    const response = await instance.get('/api/shops');
                    if (response.status === 200) {
                        const shopsData: ShopPostData[] = response.data.result;
                        setMarkers(shopsData);
                    } else {
                        console.error('가게 데이터 가져오기 오류:', response.statusText);
                    }
                } catch (error) {
                    console.error('가게 데이터 가져오기 오류:', error);
                }
            };

            fetchShops();
        }
    }, [coords]); // Include 'coords' as a dependency

    useEffect(() => {
        const indexOfLastPlace = currentPage * placesPerPage;
        const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
        const currentPlaces = markers.slice(indexOfFirstPlace, indexOfLastPlace);

        setInfo(currentPlaces[0]);
        setSelectedPlaceIndex(0);
    }, [markers, currentPage, placesPerPage]); 

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(markers.length / placesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ST.Layout>
            <ST.MenuContainer>
                <ST.SearchContainer>
                    <ST.Input
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value);
                            setMessage('');
                        }}
                        placeholder="검색할 애견샵을 입력해보세요🐶"
                    />
                    <ST.Wrap2>
                        <ST.Text>가게 검색 및 둘러보기</ST.Text>
                    </ST.Wrap2>
                    <ST.Wrap1>
                        <ST.Button onClick={searchPlaces}>검색</ST.Button>
                        <ST.Button onClick={navigateToShopList}>가게 목록 조회</ST.Button>
                    </ST.Wrap1>
                    {message && <div style={{ color: 'red' }}>{message}</div>}
                    <ST.ResultsContainer>
                        {markers.map((marker, index) => (
                            <ST.ListItem
                                key={`place-${index}`}
                                onClick={() => handleListItemClick(marker, index)}
                                className={index === selectedPlaceIndex ? 'active' : ''}
                            >
                                <ST.Text>{marker.shopName}</ST.Text>
                                <ST.Image1>
                                    {marker.imageUrls && marker.imageUrls.length > 0 && (
                                        <img
                                            src={marker.imageUrls[0]}
                                            alt={marker.shopName}
                                            style={{ width: '350px', height: '190px', borderRadius: '7px' }}
                                        />
                                    )}
                                </ST.Image1>
                                <ST.AddressText>
                                    <strong>주소:</strong> {marker.shopAddress}
                                </ST.AddressText>
                                <ST.Wrap>
                                    <ST.ShopTime>
                                        <strong>영업시간:</strong> {`${marker.shopStartTime} - ${marker.shopEndTime}`}
                                    </ST.ShopTime>
                                    {marker.shopTel1 && marker.shopTel2 && marker.shopTel3 && (
                                        <ST.PhoneText>
                                            <strong>전화번호:</strong>{' '}
                                            {`${marker.shopTel1}-${marker.shopTel2}-${marker.shopTel3}`}
                                        </ST.PhoneText>
                                    )}
                                </ST.Wrap>
                            </ST.ListItem>
                        ))}
                    </ST.ResultsContainer>
                    <ST.Pagination>
                        {pageNumbers.map((number) => (
                            <ST.PageNumber
                                key={number}
                                className={number === currentPage ? 'active' : ''}
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </ST.PageNumber>
                        ))}
                    </ST.Pagination>
                </ST.SearchContainer>
            </ST.MenuContainer>
            {/* <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={customModalStyles}> */}
            {/* <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                {info && (
                    <ST.ModalContainer>
                        <ST.H2>{info.shopName}</ST.H2>
                        <ST.ImageContainer>
                            <ST.Image>
                                {info.imageUrls && info.imageUrls.length > 0 && (
                                    <img
                                        src={info.imageUrls[0]}
                                        alt={info.shopName}
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                )}
                            </ST.Image>
                        </ST.ImageContainer>
                        <ST.H3>주소: {info.shopAddress}</ST.H3>
                        <ST.H3>전화번호: {`${info.shopTel1}-${info.shopTel2}-${info.shopTel3}`}</ST.H3>
                        <ST.H3>영업시간: {`${info.shopStartTime} - ${info.shopEndTime}`}</ST.H3>
                    </ST.ModalContainer>
                )}
            </Modal> */}
            <ST.MapContainer>
                <Map
                    center={{ lat: info?.latitude || defaultCoords.lat, lng: info?.longitude || defaultCoords.lng }}
                    style={{ width: '100%', height: '100%' }}
                    level={3}
                >
                    {markers.map((marker, index) => (
                        <MapMarker
                            key={`marker-${index}`}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            onClick={() => handleListItemClick(marker, index)}
                        />
                    ))}
                    {info && (
                        <MapInfoWindow position={{ lat: info.latitude, lng: info.longitude }} removable={true}>
                            <ST.Text>{info.shopName}</ST.Text>
                        </MapInfoWindow>
                    )}
                </Map>
            </ST.MapContainer>
        </ST.Layout>
    );
};

export default MapComponent;
