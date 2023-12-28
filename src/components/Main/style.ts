import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Pretendard-regular;
    padding: 0; // Ensure there's no padding that can affect the full-width layout
    margin: 0; // Ensure there's no margin
`
export const BannerImage = styled.img`
    width: 1450px;
    height: 550px;
    z-index: -1;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
`

export const BannerContainer = styled.div``

// export const BannerContainer = styled.div`
//     width: 1450px;
//     height: 550px; /* height 값을 늘림 */
//     flex-shrink: 0;
//     background-color: #FAFAFA;
//     background-image: url('MainBanner.png');
//     background-position: center; /* 이미지를 가운데로 정렬 */
//     background-size: cover; /* 이미지를 컨테이너에 맞게 확대 또는 축소 */
//     background-repeat: no-repeat;
//     position: relative;

//     &::before,
//     &::after {
//         content: '';
//         position: absolute;
//         width: 100%;
//         height: 20px;
//         background: url('wave-image.png');
//         background-repeat: repeat-x;
//         animation: wave-animation 5s linear infinite;
//         background-size: cover;
//     }

//     &::before {
//         top: 0;
//         background-position: 0 0;
//     }

//     &::after {
//         bottom: 0;
//         background-position: 0 100%;
//     }
// `
// ====================================================

export const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-left: 600px;
`

export const ShopBtn = styled.button`
    position: relative;
    font-size: 1.77vh;
    background-color: #ffffff;
    color: white;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    color: #00bd8f;
    width: 247.77px;
    height: 196px;
    border-radius: 18px;
    margin-right: 0;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: #e2e2e2;
    }

    & > * {
        pointer-events: none;
    }
`

export const PetBtn = styled.button`
    position: relative;
    font-size: 1.77vh;
    background-color: #ffffff;
    color: white;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    color: #00bd8f;
    width: 247.77px;
    height: 196px;
    border-radius: 18px;
    margin-right: 0;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: #e2e2e2;
    }

    & > * {
        pointer-events: none;
    }
`

export const TopWrapper = styled.div`
    max-width: 1280px;
    margin: 20px;
`

export const ShopsWrapper = styled.div`
    max-width: 1280px;
    margin: 20px;
`
export const Warp = styled.div`
    margin-top: 100px;
    margin-right: 720px;
`

export const Text = styled.h2`
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
`
export const Text1 = styled.h2`
    margin-top: 20px;
    font-size: 20px;
`
export const Text2 = styled.div`
    color: #353535;
    font-family: Pretendard Variable;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px; /* 127.273% */
`
export const Text3 = styled.h2`
    color: #353535;
    margin-top: 20px;
    font-family: Pretendard Variable;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 120% */
`

// export const PetBackImage = styled.h2`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     z-index: -1;
// `

// export const PetBackImage = styled.img`
//     position: absolute;
//     top: 140vh; // 화면 높이에 비례하여 위치 조정
//     left: 50%;
//     transform: translateX(-50%);
//     z-index: -1;
//     width: 100vw; // 화면 너비의 100% 차지
//     height: auto; // 이미지의 종횡비 유지
//     padding-top: 100px;
// `

export const PetText = styled.div`
    flex: 1; // 텍스트 영역이 차지할 공간
    text-align: left; // 텍스트 왼쪽 정렬
    color: #000;
    font-family: Pretendard Variable;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 120% */
`
export const PetText1 = styled.div`
    flex: 1; // 텍스트 영역이 차지할 공간
    text-align: left; // 텍스트 왼쪽 정렬
    margin-right: 50px;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    margin-top: 10px;
`
export const PetText2 = styled.div`
    flex: 1; // 텍스트 영역이 차지할 공간
    text-align: left; // 텍스트 왼쪽 정렬
    margin-right: 50px;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
    margin-top: 30px;
`

export const PetContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1280px;
    position: relative; // This will ensure the content is on top of the background image
`

export const PetTextWrapper = styled.div`
    display: flex;
    flex-direction: column; // 텍스트를 수직으로 나열합니다.
    margin-right: 10px; // 이미지와의 간격을 설정합니다.
    align-items: flex-start; // 텍스트를 왼쪽 정렬합니다.
`

export const MainTopWrapper = styled.div`
    display: flex; // 이미지도 flex 아이템으로 만듭니다.
    flex-direction: column; // 이미지 내부 아이템을 수직으로 나열합니다.
    align-items: center; // 이미지 내부 아이템을 중앙 정렬합니다.
`
export const OverlayContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 1280px;
    margin: auto;
`

export const PetBackImage = styled.img`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1; // Ensures it's behind the content
    width: 100vw; // Now the image will span the full width of the viewport
    height: auto; // Maintain aspect ratio
`
