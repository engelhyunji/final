import styled from 'styled-components'

export const Container = styled.div`
    width: 1440px;
    overflow-y: hidden; // 가로 스크롤바가 생기지 않도록 숨깁니다. */
    position: relative; // 이미지가 기준이 될 수 있도록 설정
    min-height: 100vh;
    margin: 0 auto;
    font-family: Pretendard-regular;
`


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


export const PetText4 = styled.div`
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    padding-right: 82px;
    text-align: center;
    color: #000;
    font-family: Pretendard Variable;
`



export const PetContent = styled.div`
    display: flex;
    align-items: center;
`


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
    padding-top: 50px;
    padding-bottom: 230px;
`

export const OverlayContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 50px;
`

// export const PetContent2 = styled.div`
//     display: flex;
//     align-items: center;
// `


export const Wrap1 = styled.div`
    display: flex;
    justify-content: center;

    &:hover {
        // 마우스 오버 시 스타일 변경
        text-decoration: underline; // 텍스트 밑줄
    }
`