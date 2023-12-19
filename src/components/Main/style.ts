import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    min-height: 100vh; /* 변경: 높이를 최소 화면 높이로 설정 */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`

export const BannerContainer = styled.div`
    width: 100%;
    height: 200px;
    background-color: #1dcb8e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const BtnContainer = styled.div`
    margin: 30px;
`

export const ShopBtn = styled.button`
    font-size: 1.77vh;
    background-color: #6ca399;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`

export const PetBtn = styled.button`
    font-size: 1.77vh;
    background-color: #6ca399;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`

export const TopWrapper = styled.div`
    max-width: 1280px;
    margin: 20px; /* 변경: margin을 줄임 */
`

export const ShopsWrapper = styled.div`
    max-width: 1280px;
    margin: 20px; /* 변경: margin을 줄임 */
`

export const Text = styled.h2`
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
`
