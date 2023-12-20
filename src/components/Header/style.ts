import styled from 'styled-components'

export const HeaderWrap = styled.div`
    width: 100%;
    height: 88px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeaderContainer = styled.div`
    width: 1200px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    color: #fff;
`

export const Logo = styled.div`
    width: 280px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const LogoH1 = styled.h1`
    font-size: 24px;
    color: #000000;
    font-family: Pretendard-Bold;
`

export const LogoImg = styled.img`
    width: 56px;
    margin: 0 20px;
`

export const GNBDiv = styled.div`
    /* width: 400px; */
    display: flex;
    align-items: center;
`

export const LogoutBtn = styled.button`
    margin-left: 20px;
    font-family: Pretendard-Medium;
    background-color: #00BD8F;
    color: #fff;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
`
