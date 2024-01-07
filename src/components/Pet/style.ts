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
export const Input = styled.input`
    width: 474px;
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
export const Form = styled.form`
    max-width: 474px;
    margin: 50px auto;
    z-index: 2;
`

export const Text = styled.h2`
    margin: 70px 0 20px;
    position: relative;
    z-index: 2;

    color: #fff;
    font-size: 30px;
    font-family: Pretendard-medium;
`

export const Error = styled.h2`
    color: red;
    font-size: 17px;
    font-family: Pretendard-medium;
`

export const LoginP = styled.p`
    margin: 0 0 50px;
    z-index: 2;

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const PetInputBox = styled.div`
    margin: 30px 0;
`

export const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    font-weight: bold;
`

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`

export const Label = styled.label`
    margin: 10px 0;
    font-family: Pretendard-bold;
    font-size: 18px;
`
export const FileIcon = styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 474px;
    height: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    margin-top: 17px;
    margin-bottom: 10px;
    font-size: 17px;
    color: #787878;
`
export const ImageContainer = styled.div`
    border-radius: 10px;
    overflow: hidden;
    width: 200px;
    height: 250px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
`

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 100px;
`

export const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const Wrap = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid #f8f8f8;
    border-radius: 7px;
    background-color: #f8f8f8;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
`

export const Image = styled.img`
    height: 160px;
    object-fit: cover;
    height: 100%;
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

export const PetBtn = styled.button`
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