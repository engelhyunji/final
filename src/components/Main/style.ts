import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    font-family: Pretendard-regular;

    position: relative;
`

export const BannerContainer = styled.div`
    width: 100%;
    height: 367px;

    overflow: hidden;
    position: relative;
`
export const BannerImage = styled.div`
    background-image: url('/MainBanner.png');
    background-position: bottom;
    background-size: cover;
    width: 100%;
    height: 367px;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
`


// ====================================================

export const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    align-items: center;
    padding-top: 100px;
`

export const MainBtn = styled.button`
    width: 247.77px;
    height: 196px;
    padding: 10px 30px;

    position: relative;
    font-size: 20px;
    color: #00bd8f;
    background-color: #fff;
    text-align: left;

    border: none;
    border-radius: 18px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
    margin-right: 150px;
    font-family: Pretendard-regular;
`

export const Text = styled.h2`
    font-size: 26px;
    font-family:pretendard-bold;
    line-height: 56px;
`
export const Text1 = styled.h2`
    font-size: 20px;
`
export const Text2 = styled.div`
    color: #353535;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
`
export const Text3 = styled.h2`
    color: #353535;
    font-size: 30px;
    font-family:pretendard-bold;
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
    padding-right: 110px;
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
`
export const OverlayContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 50px;
`

export const PetBackImage = styled.div`
    position: absolute;
    width: 2765px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 15%);
    z-index: -1;
    max-width: 100%;
    height: 969px;
    background-image: url('/PetBack.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
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

export const PetTextWrapper2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    /* align-items: flex-start; // 텍스트를 왼쪽 정렬합니다. */
    margin-left: 135px;
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