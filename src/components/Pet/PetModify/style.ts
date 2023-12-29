import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    width: 474px;
`;

export const Text = styled.h2`
    margin: 70px 0 20px;
    position: relative;
    z-index: 2;
    padding-bottom: 70px;

    color: #fff;
    font-size: 30px;
    font-family: Pretendard-medium;
`;

export const Form = styled.form`
    max-width: 474px;
    width: 100%; // 가로 너비 일관성 유지
    margin: 50px auto;
    z-index: 2;
`;

export const Label = styled.label`
    margin: 10px 0;
    font-family: Pretendard-bold;
    font-size: 18px;
`;

export const PetInputBox = styled.div`
    margin: 30px 0;
    width: 100%; // 부모 요소 너비에 맞춤
`;

export const DescInput = styled.textarea`
    width: 474px; // 직접적으로 가로 길이 설정
    height: 102px;
    margin-top: 10px;
    min-height: 145px;
    background-color: #fff;
    padding: 16px;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;
    

    resize: none;

    &::placeholder {
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`;

export const Input = styled.input`
    width: 474px;
    height: 51px;
    background-color: #fff;
    padding: 0 16px;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    border-radius: 8px;
    margin-top: 10px;

    &::placeholder {
        color: #8f8e93;
        font-size: 14px;
        font-family: Pretendard-regular;
    }
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%; // 부모 요소 너비에 맞춤
    justify-content: space-between;
    margin-top: 10px;
`;

export const Button = styled.button`
    flex: 1; // 모든 버튼이 동일한 크기를 가짐
    padding: 15px;
    border: none;
    border-radius: 5px;
    background-color: #1dcb8e;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: gray;
        opacity: 0.7;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ImgWrap = styled.div`
    width: 100%; // 부모 요소 너비에 맞춤
    height: 160px;
    border-radius: 8px;
    background-color: #d9d9d9;

    color: #787878;
    font-size: 14px;
    font-family: Pretendard-regular;

    display: flex;
    justify-content: center;
`;

export const ImgLabel = styled.label`
    width: 100%; // 부모 요소 너비에 맞춤
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const FileP = styled.p`
    font-size: 12px;
`;

export const FileSpan = styled.span`
    text-decoration: underline;
`;

export const StDropdown = styled(Dropdown)`
    width: 100%;
    height: 51px;
    border-radius: 8px;

    color: #8f8e93;
    font-family: Pretendard-regular;

    .dropdown-toggle {
        width: 100%;
        height: 100%;
        min-height: 51px;
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
        min-height: 120px; // 드롭다운 메뉴의 최소 높이 설정

        .dropdown-item {
            font-size: 14px;
            color: #333;
            padding: 10px 20px; // 드롭다운 아이템의 패딩 증가
        }

        .dropdown-item:hover {
            background-color: #eee;
        }
    }
`
