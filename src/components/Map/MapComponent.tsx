import React, { useEffect, useState, useRef } from 'react'
import { Map, MapMarker, MapInfoWindow } from 'react-kakao-maps-sdk'
import * as ST from './style'
import { MarkerInfo, MapComponentProps } from '../../kakao-maps'
import ShopMapComponent from './ShopMapComponent'

interface Place {
    place_name: string
    y: string
    x: string
    address_name: string
    road_address_name?: string
    phone: string
    image_url?: string
}

const MapComponent: React.FC<MapComponentProps> = ({ coords }) => {
    const [info, setInfo] = useState<MarkerInfo | null>(null)
    const [markers, setMarkers] = useState<MarkerInfo[]>([])
    const [keyword, setKeyword] = useState('')
    const [message, setMessage] = useState('')
    const [places, setPlaces] = useState<Place[]>([])
    const [selectedPlaceIndex, setSelectedPlaceIndex] = useState<number | null>(null)
    const [showIntro, setShowIntro] = useState(true) // 초기 안내 메시지 상태

    const map = useRef<kakao.maps.Map | null>(null)

    // ShopMapComponent에 전달할 shopId 값 설정
    const exampleShopId = 1 // 예시 값

    const searchPlaces = () => {
        if (!keyword) {
            setMessage('검색어를 입력해주세요.')
            return
        }
        setMessage('')

        const ps = new window.kakao.maps.services.Places()
        ps.keywordSearch(keyword, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const newMarkers = result.map((place) => ({
                    position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
                    content: place.place_name,
                }))
                setMarkers(newMarkers)

                const bounds = new window.kakao.maps.LatLngBounds()
                newMarkers.forEach((marker) =>
                    bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng)),
                )

                if (newMarkers.length > 0) {
                    setInfo(newMarkers[0])
                    map.current?.setBounds(bounds)
                }
                setPlaces(result)
            } else {
                alert('검색 결과가 없습니다.')
            }
        })
        // 검색 후 안내 메시지를 숨김
        setShowIntro(false)
    }

    const handleListItemClick = (index: number) => {
        if (index >= 0 && index < markers.length) {
            const marker = markers[index]
            setInfo(marker)

            setSelectedPlaceIndex(index)

            if (map.current) {
                const position = new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng)
                map.current.panTo(position)
            }
        }
    }

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            return
        }

        const script = document.createElement('script')
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=30e58bfb3907dffb16196ae237d38d8f&libraries=services'
        document.head.appendChild(script)

        script.onload = () => {
            window.kakao.maps.load(() => {
                if (coords.lat !== undefined && coords.lng !== undefined) {
                    const container = document.getElementById('myMap')
                    if (container) {
                        const options = { center: new kakao.maps.LatLng(coords.lat, coords.lng), level: 3 }
                        map.current = new kakao.maps.Map(container, options)
                    }
                }
            })
        }

        return () => {
            document.head.removeChild(script)
        }
    }, [coords])

    return (
        <div>
            <ST.Layout>
                <ST.SearchContainer>
                    <ShopMapComponent shopId={exampleShopId} />
                    <div id="myMap" />
                    <ST.Input
                        value={keyword}
                        onChange={(e) => {
                            setKeyword(e.target.value)
                            setMessage('')
                        }}
                        placeholder="애견샵을 검색해보세요.🐶"
                    />
                    <ST.Button onClick={searchPlaces}>검색</ST.Button>
                    {message && <div style={{ color: 'red' }}>{message}</div>}
                    {showIntro && (
                        <div
                            style={{
                                color: 'red',
                                fontStyle: 'italic',
                                textAlign: 'center',
                                position: 'absolute',
                                top: '50%',
                                marginTop: '10px',
                            }}
                        >
                            애견샵과 관련된
                            <br />
                            키워드를 입력하여
                            <br />
                            지도 위치를
                            <br />
                            확인해보시길 바랍니다.
                        </div>
                    )}
                    <ST.ListContainer>
                        {places.map((place, index) => (
                            <ST.ListItem
                                key={`place-${index}`}
                                onClick={() => handleListItemClick(index)}
                                className={selectedPlaceIndex === index ? 'selected' : ''}
                            >
                                <ST.Text>{place.place_name}</ST.Text>
                                {selectedPlaceIndex === index && (
                                    <ST.AddressText>
                                        <strong>주소:</strong> {place.address_name}
                                    </ST.AddressText>
                                )}
                                {selectedPlaceIndex === index && place.phone && (
                                    <ST.PhoneText>
                                        <strong>전화번호:</strong> {place.phone}
                                    </ST.PhoneText>
                                )}
                                {selectedPlaceIndex === index && place.image_url && (
                                    <img src={place.image_url} alt={place.place_name} />
                                )}
                            </ST.ListItem>
                        ))}
                    </ST.ListContainer>
                </ST.SearchContainer>

                <ST.MapContainer>
                    {info && (
                        <Map
                            center={{ lat: info.position.lat, lng: info.position.lng }}
                            style={{ width: '100%', height: '750px' }}
                            level={3}
                        >
                            {markers.map((marker, index) => (
                                <MapMarker
                                    key={`marker-${index}`}
                                    position={marker.position}
                                    onClick={() => {
                                        setInfo(marker)
                                        setSelectedPlaceIndex(index)
                                    }}
                                />
                            ))}
                            <ST.InfoWindowContent>
                                {info && (
                                    <MapInfoWindow
                                        position={{ lat: info.position.lat, lng: info.position.lng }}
                                        removable={true}
                                    >
                                        <ST.Text>{info.content}</ST.Text>
                                    </MapInfoWindow>
                                )}
                            </ST.InfoWindowContent>
                        </Map>
                    )}
                </ST.MapContainer>
            </ST.Layout>
        </div>
    )
}

export default MapComponent