import styled from 'styled-components'
import { Dropdown } from 'react-bootstrap'

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

export const ShopP = styled.p`
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
`

export const StDropdown = styled(Dropdown)`
    width: 100%;
    height: 51px;
    border-radius: 8px;

    color: #8f8e93;
    font-family: Pretendard-regular;

    .dropdown-toggle {
        width: 100%;
        height: 100%;
        padding: 0 16px;
        background-color: #fff;
        border: 1px solid #dadada;
        border-radius: 8px;

        text-align: left;
        font-size: 14px;
        color: #8f8e93;

        &:hover {
            filter: brightness(95%);
        }

        &:after {
            position: absolute;
            top: 45%;
            right: 16px;
            display: inline-block;
        }
    }

    .dropdown-menu {
        width: 100%;

        .dropdown-item {
            font-size: 14px;
            color: #333;
        }

        .dropdown-item:hover {
            background-color: #eee;
        }
    }
`

export const Select = styled.select`
    width: 100%;
    height: 51px;
    padding: 12px;
    background-color: #fff;
    outline: none;
    border: none;
    border-radius: 10px;

    color: #8f8e93;
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
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const NnTInputBox = styled.div`
    color: #8f8e93;
    font-family: Pretendard-regular;

    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const NSpan = styled.span`
    width: 10px;
    height: 1px;
    background-color: #8f8e93;
`
export const NInput = styled.input`
    width: 28%;
    height: 51px;
    padding: 0 16px;
    background-color: #fff;
    border: 1px solid #dadada;
    border-radius: 8px;

    &::placeholder {
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const TInput = styled.input`
    width: 42%;
    height: 51px;
    background-color: #fff;
    padding: 0 16px;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;

    &::placeholder {
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const DescInput = styled.textarea`
    width: 100%;
    height: 102px;
    background-color: #fff;
    padding: 16px 16px;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;

    resize: none;

    &::placeholder {
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`
export const desLimit = styled.span`
    width: 44px;
    display: inline-block;
    text-align: right;
    font-size: 12px;
`


export const ImgWrap = styled.div`
    height: 160px;
    border-radius: 8px;
    background-color: #d9d9d9;

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
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`

// ======= ShopList 컴포넌트 ========
// 코드 정리 이사 중

// ======= ShopDetail 컴포넌트 ========
// 코드 정리 이사 중

// ======= Modify 컴포넌트 ========

export const ShopBtnBox = styled.div`
    width: 100%;
    font-size: 18px;
    font-family: Pretendard-regular;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ShopModifyBtn = styled.button`
    width: 227px;
    height: 51px;
    color: #fff;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`
