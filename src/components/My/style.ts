import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;

    font-family: Pretendard-regular;

    z-index: 1;
`

export const MyContainer = styled.div`
    width: 1200px;
    margin: 50px auto;
    padding: 50px;
    background-color: #fff;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: left;
    z-index: 3;
`

export const ShopNPetSection = styled.section`
    margin: 30px;
`

export const TitleH2 = styled.h2`
    font-size: 24px;
    font-family: Pretendard-bold;
`

export const TitleH3 = styled.h3`
    margin: 0 0 30px;
    font-size: 20px;
    font-family: Pretendard-semibold;
`
export const TitleH4 = styled.h4`
    margin: 3px 0;
    font-size: 20px;
    font-family: Pretendard-medium;
`

export const MyUl = styled.ul`
    width: 100%;
    border-bottom: 1px solid #dadada;
    
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

export const MyDiv = styled.div`
    cursor: pointer;
    width: 300px;
    /* height: 400px; */
    overflow: hidden;
    display: inline-block;
    white-space: nowrap; // 자동 줄바꿈 방지
    overflow: hidden; // 넘치는 부분 화면에서 숨김
    /* margin: 44px auto 0; */

    border-radius: 15px;
    border: 1px solid #dadada;
    background: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;
`
export const MyChatDiv = styled.div`
    cursor: pointer;
    width: 400px;
    height: 100px;
    padding: 0 20px;
    font-size: 22px;
    font-family: Pretendard-semibold;

    border-radius: 15px;
    background: #eee;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const MyShopImg = styled.img`
    width: 100%;
    height: 245px;
    object-fit: cover;
`

export const ImgInfo = styled.div`
    width: 100%;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    p {
        // 넘치는 내용 처리
        display: inline-block;
        white-space: nowrap; // 자동 줄바꿈 방지
        overflow: hidden; // 넘치는 부분 화면에서 숨김
        text-overflow: ellipsis; // 숨긴 부분 말줄임표(...) 처리
    }
`


export const ShopNameH2 = styled.h2`
    width: 100%;
    margin-bottom: 30px;

    font-size: 42px;
    font-family: Pretendard-Bold;
`
export const ShopInfoP = styled.p`
    font-size: 18px;
    line-height: 28px;

    font-family: Pretendard-regular;
`

export const BtnContainer = styled.div`
    margin: 10px 0 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
`

export const MyBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`
export const ChatDelBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #fd4141;
    font-family: Pretendard-medium;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`

export const LeaveSpan = styled.span`
    margin: 70px auto 0;
    color: #bbb;
`
