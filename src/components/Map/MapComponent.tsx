// import React, { useEffect, useState, useRef } from 'react'
// import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
// import * as ST from './style'
// import { MarkerInfo, MapComponentProps } from '../../kakao-maps'

// const MapComponent: React.FC<MapComponentProps> = ({ coords }) => {
//     const [info, setInfo] = useState<MarkerInfo | null>(null)
//     const [markers, setMarkers] = useState<MarkerInfo[]>([])
//     const [keyword, setKeyword] = useState('')
//     const [message, setMessage] = useState('')

//     const map = useRef<kakao.maps.Map | null>(null)

//     const searchPlaces = () => {
//         if (!keyword) {
//             setMessage('검색어를 입력해주세요.')
//             return
//         }
//         setMessage('')

//         const ps = new window.kakao.maps.services.Places()
//         ps.keywordSearch(keyword, (result, status) => {
//             if (status === kakao.maps.services.Status.OK) {
//                 const newMarkers = result.map((place) => ({
//                     position: { lat: parseFloat(place.y), lng: parseFloat(place.x) },
//                     content: place.place_name,
//                 }))
//                 setMarkers(newMarkers)

//                 const bounds = new window.kakao.maps.LatLngBounds()
//                 newMarkers.forEach((marker) =>
//                     bounds.extend(new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng)),
//                 )

//                 if (newMarkers.length > 0) {
//                     setInfo(newMarkers[0])
//                     map.current?.setBounds(bounds)
//                 }
//             } else {
//                 alert('검색 결과가 없습니다.')
//             }
//         })
//     }

//     useEffect(() => {
//         if (coords.lat !== undefined && coords.lng !== undefined) {
//             const container = document.getElementById('myMap')
//             if (container) {
//                 const options = { center: new kakao.maps.LatLng(coords.lat, coords.lng), level: 3 }
//                 map.current = new kakao.maps.Map(container, options)
//             }
//         }
//     }, [coords])

//     return (
//         <div>
//             <ST.SearchContainer>
//                 <div id="myMap" style={{ width: '100%', height: '550%' }} />
//                 <ST.Input
//                     value={keyword}
//                     onChange={(e) => {
//                         setKeyword(e.target.value)
//                         setMessage('')
//                     }}
//                     placeholder="검색할 지역을 입력해보세요!"
//                 />
//                 <ST.Button onClick={searchPlaces}>보기</ST.Button>
//                 {message && <div style={{ color: 'red' }}>{message}</div>}
//                 {info && (
//                     <Map
//                         center={{ lat: info.position.lat, lng: info.position.lng }}
//                         style={{ width: '100%', height: '750px' }}
//                         level={3}
//                     >
//                         {markers.map((marker, index) => (
//                             <MapMarker
//                                 key={`marker-${index}`}
//                                 position={marker.position}
//                                 onClick={() => setInfo(marker)}
//                             >
//                                 {info && info.content === marker.content && (
//                                     <CustomOverlayMap position={marker.position}>
//                                         <div style={{ color: '#000' }}>{marker.content}</div>
//                                     </CustomOverlayMap>
//                                 )}
//                             </MapMarker>
//                         ))}
//                     </Map>
//                 )}
//             </ST.SearchContainer>
//         </div>
//     )
// }

// export default MapComponent

import React, { useEffect, useState, useRef } from 'react'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import * as ST from './style'
import { MapComponentProps, MarkerInfo } from '../../kakao-maps'

const MapComponent: React.FC<MapComponentProps> = ({ coords }) => {
    const [info, setInfo] = useState<MarkerInfo | null>(null)
    const [markers, setMarkers] = useState<MarkerInfo[]>([])
    const [keyword, setKeyword] = useState('')
    const [message, setMessage] = useState('')

    const map = useRef<kakao.maps.Map | null>(null)

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
            } else {
                alert('검색 결과가 없습니다.')
            }
        })
    }

    useEffect(() => {
        if (window.kakao && window.kakao.maps) {
            return
        }

        const script = document.createElement('script')
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=30e58bfb3907dffb16196ae237d38d8f&libraries=services'
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
            <ST.SearchContainer>
                <div id="myMap" />
                {/* style={{ width: '100%', height: '550px' }} */}
                <ST.Input
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value)
                        setMessage('')
                    }}
                    placeholder="검색할 지역을 입력해보세요!"
                />
                <ST.Button onClick={searchPlaces}>보기</ST.Button>
                {message && <div style={{ color: 'red' }}>{message}</div>}
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
                                onClick={() => setInfo(marker)}
                            >
                                {info && info.content === marker.content && (
                                    <CustomOverlayMap position={marker.position}>
                                        <div style={{ color: '#000' }}>{marker.content}</div>
                                    </CustomOverlayMap>
                                )}
                            </MapMarker>
                        ))}
                    </Map>
                )}
            </ST.SearchContainer>
        </div>
    )
}

export default MapComponent
