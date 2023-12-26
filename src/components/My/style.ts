import styled from "styled-components";


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
    padding: 40px;
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
`

export const TitleH3 = styled.h3`
    font-size: 20px;
`


export const MyUl = styled.ul`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`

export const MyDiv = styled.div`
    cursor: pointer;
    width: 500px;
    /* margin: 44px auto 0; */

    border-radius: 15px;
    border: 1px solid #dadada;
    background: #fff;

    display: flex;
    align-items: center;
`

export const MyShopImg = styled.img`
    width:35%;
    /* height: 300px; */
    object-fit: contain;
`

export const ImgInfo = styled.div`
    width: 65%;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
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
    margin: 30px;
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
    color: #FD4141;
    font-family: Pretendard-medium;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`


export const LeaveSpan = styled.span`
    margin: 100px auto 0;
    color: #bbb;
`