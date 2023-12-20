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
}

export {}
