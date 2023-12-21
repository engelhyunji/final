import React, { useEffect, useState } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'

// 카카오 맵 타입 정의
declare global {
    interface Window {
        kakao: any
    }
}

// 좌표의 타입 정의
interface Coords {
    lat: number
    lng: number
}

// 마커 정보의 타입 정의
interface MarkerInfo {
    position: Coords
    content: string
    title?: string
}

// MapComponent의 Props 타입 정의
interface MapComponentProps {
    coords: Coords
}

const MapComponent: React.FC<MapComponentProps> = ({ coords }) => {
    const [info, setInfo] = useState<MarkerInfo | null>(null)
    const [markers, setMarkers] = useState<MarkerInfo[]>([])
    const [keyword, setKeyword] = useState('')

    // 키워드 검색 함수
    const searchPlaces = () => {
        if (keyword) {
            const ps = new window.kakao.maps.services.Places()
            ps.keywordSearch(keyword, (data: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const newMarkers: MarkerInfo[] = data.map((place: any) => ({
                        position: {
                            lat: parseFloat(place.y),
                            lng: parseFloat(place.x),
                        },
                        content: place.place_name,
                    }))

                    setMarkers(newMarkers)

                    const bounds = new window.kakao.maps.LatLngBounds()
                    newMarkers.forEach((marker) => {
                        bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng))
                    })

                    if (newMarkers.length > 0) {
                        setInfo(newMarkers[0]) // Set the first marker as info initially
                        // Assuming you have a reference to the map component
                        map.current?.setBounds(bounds)
                    }
                } else {
                    alert('검색 결과가 없습니다.')
                }
            })
        }
    }

    const map = React.useRef<any>(null) // Reference to the map component

    useEffect(() => {
        if (coords && coords.lat !== undefined && coords.lng !== undefined) {
            const container = document.getElementById('myMap')
            if (container) {
                const options = {
                    center: new window.kakao.maps.LatLng(coords.lat, coords.lng),
                    level: 3,
                }
                map.current = new window.kakao.maps.Map(container, options)
            }
        }
    }, [coords])

    return (
        <div>
            <div id="myMap" style={{ width: '100%', height: '550%' }} />
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={'검색할 지역을 입력해보세요!'}
            />
            <button onClick={searchPlaces}>보기</button>
            {info && (
                <Map
                    center={{ lat: info.position.lat, lng: info.position.lng }}
                    style={{ width: '100%', height: '750px' }}
                    level={3}
                >
                    {markers.map((marker, index) => (
                        <MapMarker key={`marker-${index}`} position={marker.position} onClick={() => setInfo(marker)}>
                            {info && info.content === marker.content && (
                                <CustomOverlayMap position={marker.position}>
                                    <div style={{ color: '#000' }}>{marker.content}</div>
                                </CustomOverlayMap>
                            )}
                        </MapMarker>
                    ))}
                </Map>
            )}
        </div>
    )
}

export default MapComponent