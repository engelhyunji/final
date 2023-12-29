import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;
    font-family: Pretendard-regular;

    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 1440px; // 화면의 전체 가로 너비를 사용합니다.
    max-width: 100%; // 최대 너비를 100%로 설정하여 이미지가 넘치지 않도록 합니다.
    overflow-x: hidden; // 가로 스크롤바가 생기지 않도록 숨깁니다.
    overflow-y: hidden; // 가로 스크롤바가 생기지 않도록 숨깁니다.
    position: relative; // 이미지가 기준이 될 수 있도록 설정
    min-height: 100vh;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    margin: 0 auto; */
`

// export const Container = styled.div`
//     width: 100vw;
//     max-width: 100%;
//     overflow-x: hidden;
//     overflow-y: hidden;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     min-height: 100vh;
//     /* padding: 0;  */
// `;

export const Container1 = styled.div``
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
export const BannerImage = styled.img`
    width: 1440px;
    height: 330px;
    background-image: url('Main1.png');
    background-position: bottom;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

export const BannerContainer = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
    display: flex;
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
    margin: 100px 0;

    display: flex;
    justify-content: center;
    gap: 39px;
    /* display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    padding-top: 100px; */
`

export const ShopBtn = styled.button`
    width: 247px;
    height: 186px;

    background-color: #fff;
    line-height: 22px;
    padding: 32px;
    border: none;
    color: #00bd8f;

    border-radius: 18px;
    cursor: pointer;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    gap: 40px;
    /* position: relative;
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
    } */
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
    /* margin: 20px auto; */
`

// export const ShopsWrapper = styled.div`
//     max-width: 1280px;
//     margin: 20px;
// `
export const Warp = styled.div`
    margin: 130px 100px;
    width: 610px;
`

export const Text = styled.h2`
    /* margin-top: 30px; */
    font-size: 25px;
    font-family: Pretendard-bold;
`
export const Text1 = styled.h2`
    /* margin-top: 20px; */
    text-align: left;
    font-size: 20px;
`
export const Text2 = styled.div`
    /* margin-left: 100px; */
    color: #353535;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
`
export const Text3 = styled.h2`
    color: #353535;
    margin-top: 20px;
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

export const PetTextP = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    padding-right: 100px;
    text-align: center;
    color: #000;
    font-family: Pretendard Variable;
`

export const PetText = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    padding-right: 82px;
    text-align: center;
    color: #000;
    font-family: Pretendard Variable;
`
export const PetText1 = styled.div`
    font-size: 18px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    width: 149px;
    height: 40px;
    /* text-align: center; */
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    margin-top: 10px;
    white-space: normal;
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
    font-family: Pretendard Variable;
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
    font-family: Pretendard Variable;
    margin-top: 20px;
    margin-left: -129px;
    display: flex;
    align-items: center;
    justify-content: center;
    direction: calc(50% -20);
`

export const PetContent = styled.div`
    display: flex;
    align-items: center;
`

export const PetTextWrapper = styled.div`
    display: flex;
    flex-direction: column; // 텍스트를 수직으로 나열합니다.
    margin-right: 10px; // 이미지와의 간격을 설정합니다.
    /* align-items: flex-start; // 텍스트를 왼쪽 정렬합니다. */
    margin-left: 135px;
`

export const MainTopWrapper = styled.div`
    display: flex; // 이미지도 flex 아이템으로 만듭니다.
    flex-direction: column; // 이미지 내부 아이템을 수직으로 나열합니다.
    align-items: center; // 이미지 내부 아이템을 중앙 정렬합니다.
    padding-left: 50px;
`
export const OverlayContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`

export const PetBackImage = styled.img`
    margin-right: 170px;
    position: absolute;
    width: 100%;
    top: 47%;
    left: 50%;
    transform: translate(-50%, 15%);
    z-index: -1;
    max-width: 100%;
    height: auto;
    content: url('/public/PetBack.png');
`
export const Bottom = styled.div`
    padding-top: 50px; // 위쪽 여백
    padding-bottom: 70px; // 아래쪽 여백
    bottom: 0;
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

// export const PetTextWrapper2 = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     margin-right: 10px;
//     /* align-items: flex-start; // 텍스트를 왼쪽 정렬합니다. */
//     margin-left: 50px;
// `

export const PetTextWrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    max-width: 1280px;
    padding: 0 50px;
    box-sizing: border-box;
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
