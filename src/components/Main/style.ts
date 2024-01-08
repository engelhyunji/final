import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    position: relative;
    min-height: 100vh;
    margin: 0 auto;
    font-family: Pretendard-regular;
`

export const BannerContainer = styled.div`
    height: 380px;
    overflow: hidden;
    position: relative;
`

export const BannerImage = styled.div`
    background: no-repeat center/100% 430px url('/MainBanner.png');
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
    line-height: 36px;
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
    margin-right: 1px;
    position: relative;
`

export const TextWrapper1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding-left: 100px;
    position: relative;
`

export const PetText = styled.div`
    font-size: 30px;
    line-height: 36px;
    font-family: Pretendard-bold;
`

export const ShopText = styled.div`
    font-size: 30px;
    line-height: 36px;
    font-family: Pretendard-bold;
`

export const PetText1 = styled.div`
    font-size: 18px;
    line-height: 20px;
    width: 149px;
    margin-top: 10px;
    color: #8f8e93;
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
    margin-left: -110px;
`

export const MainTopWrapper = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
`
export const OverlayContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    
`

export const PetBackImage = styled.div`
    position: absolute;
    width: 100%;
    height: 938px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -1;
    background: no-repeat center/100% 938px url('/MainPet.png');
`
export const Bottom = styled.div`
    padding-top: 30px 0 50px;
    padding-bottom: 180px;
`

export const OverlayContainer2 = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1440px;
    margin: 0 auto;
    padding: 50px;
    background: repeat-x center/50% url('/mainItem.png');
`


export const Wrap1 = styled.div`
    display: flex;
    justify-content: center;

    &:hover {
        text-decoration: underline; 
    }
`