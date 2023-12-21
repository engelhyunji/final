// kakao-maps.d.ts
declare global {
    interface Window {
        kakao: {
            maps: {
                LatLng: new (lat: number, lng: number) => KakaoMap.LatLng
                Map: new (container: HTMLElement, options: KakaoMap.MapOptions) => KakaoMap.Map
            }
        }
    }
}

declare namespace KakaoMap {
    interface Map {
        // 지도 관련 메서드 및 속성
    }

    interface MapOptions {
        center: LatLng
        level: number
    }

    interface LatLng {
        // 위도, 경도 관련 메서드 및 속성
    }

    interface Window {
        kakao: any
    }

    interface KakaoMapProps {
        coords: {
            lat: number
            lon: number
        }
    }

    interface MarkerInfo {
        position: {
            lat: number
            lng: number
        }
        content: string
    }

    // Props와 State 타입 정의
    interface Coords {
        lat: number
        lon: number
    }

    interface MapComponentProps {
        coords: Coords // `coords` prop을 필수로 설정합니다.
    }
}

export {}
