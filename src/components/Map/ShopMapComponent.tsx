// 백엔드랑 연동했을 때 데이터 가게 조회 함수.
import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { getShopLocation } from '../../apis/api/api';

interface Location {
    latitude: number;
    longitude: number;
    address: string;
}

const ShopMapComponent = ({ shopId }: { shopId: number }) => {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const loc = await getShopLocation(shopId);
                setLocation(loc);
                console.log('위치 정보',loc)
                console.log('shopId', shopId)
            } catch (error) {
                console.log('위치 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchLocation();
    }, [shopId]);

    return (
        <div>
            {location && (
                <Map
                    center={{ lat: location.latitude, lng: location.longitude }}
                    style={{ width: '100%', height: '350px' }}
                >
                    <MapMarker
                        position={{ lat: location.latitude, lng: location.longitude }}
                        title={location.address}
                    />
                </Map>
            )}
        </div>
    )
}
export default ShopMapComponent