import styled from 'styled-components'

export const HeaderWrap = styled.div`
    width: 100%;
    height: 88px;
    background-color: #fff;
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
    font-size: 33px;
    color: white;
    font-family: Pretendard-Bold;
    text-shadow: 
        -2px -2px 0 #1dcb8e,  
        1px -2px 0 #1dcb8e,
        -1px 1px 0 #1dcb8e,
        1px 1px 0 #1dcb8e; 
`


export const LogoImg = styled.img`
    width: 56px;
    margin: 0 20px;
`
export const LogoImg1 = styled.img`
    width: 56px;
    height: 20px;
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
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
`
