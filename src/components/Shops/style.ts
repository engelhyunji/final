import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Text = styled.h2`
    margin: 70px 0 20px;
    position: relative;
    z-index: 2;

    color: #fff;
    font-size: 30px;
    font-family: Pretendard-medium;
`

export const LoginP = styled.p`
    margin: 0 0 50px;
    z-index: 2;

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const Form = styled.form`
    max-width: 474px;
    margin: 50px auto;
    z-index: 2;
`

export const SelectContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;
`
export const Select = styled.select`
    width: 100%;
    height: 51px;
    padding: 12px;
    background-color: #fff;
    outline: none;
    border: none;
    border-radius: 10px;

    color: #8F8E93;
    font-size: 14px;
    font-family: Pretendard-regular;
`
export const FirstOption = styled.option`
    color: #bbb;
`

export const ShopInputBox = styled.div`
    margin: 30px 0;
`


export const Label = styled.label`
    margin: 10px 0;
    font-family: Pretendard-bold;
    font-size: 18px;
`

export const Input = styled.input`
    width: 100%;
    height: 51px;
    background-color: #fff;
    padding: 0 16px;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;

    &::placeholder {
        color: #8F8E93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const NInputBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const NSpan = styled.span`
    width: 10px;
    height: 1px;
    background-color: #8F8E93;
`
export const NInput = styled.input`
    width: 30%;
    height: 51px;
    background-color: #fff;
    padding: 0 16px;
    border: 1px solid #dadada;
    border-radius: 8px;

    &::placeholder {
        color: #8F8E93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const ImgWrap = styled.div`
    height: 160px;
    border-radius: 8px;
    background-color: #D9D9D9;

    color: #787878;
    font-size: 14px;
    font-family: Pretendard-regular;

    display: flex;
    justify-content: center;
`
export const ImgLabel = styled.label`
    width: 100%;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`
export const FileSpan = styled.span`
    text-decoration: underline;
`
export const FileP = styled.p`
    font-size: 12px;
`
export const Image = styled.img`
    height: 160px;
    object-fit: cover;
`


export const ShopBtn = styled.button`
    width: 180px;
    height: 51px;
    display: block;
    margin: 0 auto;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00BD8F;
    border: none;
    border-radius: 8px;
`

// =====ShopList 컴포넌트======
export const thumImg = styled.img`
    max-width: 300px;
    height: 300px;
`

// =====ShopDetail 컴포넌트======
export const detailImg = styled.img`
    max-width: 300px;
    height: 300px;
`
//=====Modify 컴포넌트=====
