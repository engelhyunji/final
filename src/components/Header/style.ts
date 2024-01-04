import styled from 'styled-components'

interface LogoProps {
    $logoUrl: string
}

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
export const LogoBox = styled.div`
    cursor: pointer;
    height: 100%;
    display: flex;
    justify-content: space-between;
`
export const Logo = styled.div<LogoProps>`
    width: 88px;
    height: 88px;
    background: no-repeat center/100% url(${props => props.$logoUrl});
    display: flex;
    align-items: center;
`

export const LogoH1 = styled.h1<LogoProps>`
    width: 120px;
    background: no-repeat center 22px/100% url(${props => props.$logoUrl});
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
