import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
`

export const LoginBox = styled.div`
    width: 728px;
    height: 750px;
    margin: 72px auto;
    background-color: #fff;
    padding-top: 120px;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

export const LoginTitleH2 = styled.h2`
    text-align: center;
    font-size: 24px;
    font-family: Pretendard-Bold;
`

export const LoginP = styled.p`
    text-align: center;
    margin: 20px 0 50px;
    color: #aaa;
    font-family: Pretendard-regular;
`

export const LoginForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`

export const LoginInputBox = styled.p`
    width: 474px;
    height: 85px;
`

export const LoginLabel = styled.label`
    font-size: 16px;
    font-family: Pretendard-Bold;
    margin-bottom: 16px;
`

export const LoginInput = styled.input`
    width: 474px;
    height: 51px;
    padding: 0 16px;
    outline: none;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: Pretendard-regular;
    font-size: 14px;
`

export const LoginBtn = styled.button`
    width: 180px;
    height: 51px;
    margin: 30px 0 16px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00BD8F;
    border: none;
    border-radius: 8px;
`

export const NotUserP = styled.span`
    color: #000;
    font-family: Pretendard-medium;
    cursor: pointer;
`