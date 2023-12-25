// // kakao-maps.d.ts
// declare global {
//     interface Window {
//         kakao: {
//             maps: {
//                 LatLng: new (lat: number, lng: number) => KakaoMap.LatLng
//                 Map: new (container: HTMLElement, options: KakaoMap.MapOptions) => KakaoMap.Map
//             }
//         }
//     }
// }

// declare namespace KakaoMap {
//     interface Map {
//         // 지도 관련 메서드 및 속성
//     }

//     interface MapOptions {
//         center: LatLng
//         level: number
//     }

//     interface LatLng {
//         // 위도, 경도 관련 메서드 및 속성
//     }

//     interface Window {
//         kakao: any
//     }

//     interface KakaoMapProps {
//         coords: {
//             lat: number
//             lon: number
//         }
//     }

//     interface MarkerInfo {
//         position: {
//             lat: number
//             lng: number
//         }
//         content: string
//     }

//     // Props와 State 타입 정의
//     interface Coords {
//         lat: number
//         lon: number
//     }

//     interface MapComponentProps {
//         coords: Coords // `coords` prop을 필수로 설정합니다.
//     }
// }

// export {}
// kakao-maps.d.ts

// export {}

// declare global {
//     interface Window {
//         kakao: {
//             maps: {
//                 LatLng: new (lat: number, lng: number) => any
//                 Map: new (container: HTMLElement, options: any) => any
//                 services: {
//                     Places: new () => any
//                     Status: {
//                         OK: any
//                     }
//                 }
//             }
//         }
//     }
// }

// export interface Coords {
//     lat: number
//     lng: number
// }

// export interface MarkerInfo {
//     position: Coords
//     content: string
//     title?: string
// }

// export interface MapComponentProps {
//     coords: Coords
// }

export interface LatLng {
    getLat(): number
    getLng(): number
}

export interface Map {
    setCenter(latlng: LatLng): void
    setLevel(level: number): void
}

export interface Places {
    keywordSearch(keyword: string, callback: (result: PlaceResult[], status: Status) => void): void
}

export interface PlaceResult {
    y: string
    x: string
    place_name: string
}

export enum Status {
    OK = 'OK',
}

declare global {
    interface Window {
        kakao: {
            maps: {
                LatLng: typeof kakao.maps.LatLng
                Map: typeof kakao.maps.Map
                services: {
                    Places: typeof kakao.maps.services.Places
                    Status: typeof kakao.maps.services.Status
                }
            }
        }
    }
}

export interface MapOptions {
    center: LatLng
    level: number
}

export interface Coords {
    lat: number
    lng: number
}

export interface MarkerInfo {
    position: Coords
    content: string
    title?: string
}

export interface MapComponentProps {
    coords: Coords
}
