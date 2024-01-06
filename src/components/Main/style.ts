import styled from 'styled-components'

export const Container = styled.div`
    width: 1440px;
    /* max-width: 100%; // 최대 너비를 100%로 설정하여 이미지가 넘치지 않도록 합니다. */
    /* overflow-x: hidden; // 가로 스크롤바가 생기지 않도록 숨깁니다.
    overflow-y: hidden; // 가로 스크롤바가 생기지 않도록 숨깁니다. */
    position: relative; // 이미지가 기준이 될 수 있도록 설정
    min-height: 100vh;
    margin: 0 auto;
    font-family: Pretendard-regular;
`
// export const Container = styled.div`
//     max-width: 1440px;
//     margin: 0 auto;
//     position: relative;

//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

// export const MainContainer = styled.div`
//     width: 100%;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     font-family: Pretendard-regular;
//     padding: 0;
//     margin: 0;
// `

export const BannerContainer = styled.div`
    height: 450px;
    overflow: hidden;
    position: relative;
`

export const BannerImage = styled.div`
    background-image: url('/MainBanner.png');
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 430px;
    z-index: -1;
    position: absolute;
    top: -50px;
`

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
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding-top: 100px;
`
export const Warp = styled.div`
    /* margin-top: 100px; */
    margin-right: 150px;
    font-family: Pretendard-bold;
`
export const Text2 = styled.div`
    color: #353535;
    font-size: 22px;
    line-height: 28px;
`
export const Text3 = styled.h2`
    color: #353535;
    margin-top: 10px;
    font-size: 30px;
    line-height: 36px; /* 120% */
`

export const ShopBtn = styled.button`
    width: 246px;
    height: 196px;
    padding: 10px 30px;

    position: relative;
    text-align: left;

    font-size: 20px;
    color: #00bd8f;
    background-color: #fff;
    
    border: none;
    border-radius: 18px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
export const Text1 = styled.h2`
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 23px;
`
export const Text = styled.h2`
    font-size: 24px;
    font-family: Pretendard-bold;
`

export const TopWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`
export const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-right: 59px;
`

// export const ShopsWrapper = styled.div`
//     max-width: 1200px;
//     margin: 20px;
// `






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

// export const PetTextP = styled.div`
//     font-size: 30px;
//     font-weight: 700;
//     line-height: 36px;
//     padding-right: 45px;
//     flex-direction: row;
//     text-align: center;
//     color: #000;
//     font-family: Pretendard Variable;
// `

export const PetText = styled.div`
    font-size: 30px;
    line-height: 36px;
    font-family: Pretendard-bold;
`
export const PetText1 = styled.div`
    font-size: 18px;
    line-height: 20px;
    width: 149px;
    margin-top: 10px;
    color: #8F8E93;
`

export const PetText2 = styled.div`
    /* font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    text-align: center;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    margin-top: 30px;
    padding-right: 96px; */
    /* ======== */
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    margin-top: 20px;
    margin-left: -129px;
    display: flex;
    align-items: center;
    justify-content: center;
    direction: calc(50% -20);
    font-weight: bold;
`

export const PetText3 = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    width: 149px;
    height: 40px;
    /* text-align: center; */
    color: var(--Gray3, #575756);
    margin-top: 10px;
    white-space: normal;
`

// export const PetText9 = styled.div`
//     /* font-size: 14px;
//     font-weight: 400;
//     line-height: 16px;
//     text-align: center;
//     color: var(--Gray3, #575756);
//     font-family: Pretendard Variable;
//     margin-top: 30px;
//     padding-right: 96px; */
//     /* ======== */
//     font-size: 14px;
//     font-weight: 400;
//     line-height: 16px;
//     color: var(--Gray3, #575756);
//     font-family: Pretendard Variable;
//     margin-top: 20px;
//     margin-left: -129px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     direction: calc(50% -20);
// `

export const PetText4 = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    padding-right: 82px;
    text-align: center;
    color: #000;
    font-family: Pretendard Variable;
`

export const PetText5 = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: var(--Gray3, #575756);
    margin-top: 20px;
    margin-left: -129px;
    display: flex;
    align-items: center;
    justify-content: center;
    direction: calc(50% -20);
    font-weight: bold;
`

export const PetContent = styled.div`
    display: flex;
    align-items: center;
`

// export const PetTextWrapper = styled.div`
//     display: flex;
//     flex-direction: column; // 텍스트를 수직으로 나열합니다.
//     margin-right: 10px; // 이미지와의 간격을 설정합니다.
//     /* align-items: flex-start; // 텍스트를 왼쪽 정렬합니다. */
//     margin-left: 135px;
// `

export const MainTopWrapper = styled.div`
    display: flex; // 이미지도 flex 아이템으로 만듭니다.
    flex-direction: column; // 이미지 내부 아이템을 수직으로 나열합니다.
    align-items: center; // 이미지 내부 아이템을 중앙 정렬합니다.
`
export const OverlayContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`

export const PetBackImage = styled.div`
    position: absolute;
    width: 1440px;
    top: 45%;
    left: 50%;
    transform: translate(-50%, 15%);
    z-index: -1;
    height: 969px;
    background-image: url('/PetBack.png');
    background-repeat: no-repeat;
`
export const Bottom = styled.div`
    padding-top: 50px; // 위쪽 여백
    padding-bottom: 70px; // 아래쪽 여백
`

export const OverlayContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 50px;
`

export const PetContent2 = styled.div`
    display: flex;
    align-items: center;
`



export const Wrap1 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
        // 마우스 오버 시 스타일 변경
        text-decoration: underline; // 텍스트 밑줄
    }
`