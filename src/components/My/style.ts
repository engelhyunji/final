import styled from "styled-components";


export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;

    font-family: Pretendard-regular;
    
    z-index: 1;
`

export const MyContainer = styled.div`
    max-width: 1440px;
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
`

export const MyShopImg = styled.img`
    max-width:300px;
    height: 300px;
`

export const BtnContainer = styled.div`
    margin: 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
`

export const MyBtn = styled.button`
    width: 100px;
    height: 51px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`

export const LeaveSpan = styled.span`
    margin: 100px auto 0;
    color: #bbb;
`