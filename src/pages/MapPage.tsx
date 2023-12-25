import MapComponent from '../components/Map/MapComponent'

const MapPage: React.FC = () => {
    // 지도의 초기 중심점 좌표 설정
    const initialCoords = {
        lat: 37.5665, // 예시 위도 값
        lng: 126.978, // 예시 경도 값
    }

    return (
        <div>
            <br />
            <br />
            <MapComponent coords={initialCoords} />
        </div>
    )
}

export default MapPage
