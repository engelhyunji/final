import styled from 'styled-components'

export const MainContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
`

export const BannerContainer = styled.div`
    width: 100%;
    height: 300px;
    background-color: #1dcb8e;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-left: 600px;
`

export const ShopBtn = styled.button`
    position: relative;
    font-size: 1.77vh;
    background-color: #ffffff;
    color: white;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    color: #00bd8f;
    width: 247.77px;
    height: 196px;
    border-radius: 7px;
    margin-right: 0;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: #e2e2e2;
    }

    & > * {
        pointer-events: none;
    }
`

export const PetBtn = styled.button`
    position: relative;
    font-size: 1.77vh;
    background-color: #ffffff;
    color: white;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    color: #00bd8f;
    width: 247.77px;
    height: 196px;
    border-radius: 7px;
    margin-right: 0;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: #e2e2e2;
    }

    & > * {
        pointer-events: none;
    }
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
    margin-top: 100px;
    margin-right: 720px;
`

export const Text = styled.h2`
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
`
export const Text1 = styled.h2`
    margin-top: 20px;
    font-size: 20px;
`
export const Text2 = styled.div`
    color: aliceblue;
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
    text-align: left;
`
export const Text3 = styled.h2`
    color: aliceblue;
    margin-top: 20px;
    font-size: 35px;
    font-weight: bold;
    text-align: left;
`
