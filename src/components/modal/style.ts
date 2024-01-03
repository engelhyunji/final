import styled from 'styled-components'

interface BtnProps {
    $textColor: string
    $buttonColor: string
}


export const StBackground = styled.div`
    width: 100%;
    height: 100%;
    font-family: Pretendard-medium;

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(218, 218, 218, 0.7);
`


export const ChatInputDiv = styled.div`
    width: 450px;
    height: 250px;
    border-radius: 14px;
    padding: 26px;
    position: relative;
    background: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`

export const ChatNameInput = styled.input`
    width: 407px;
    padding: 11px 13px;
    margin: 20px;

    border-radius: 7px;
    border: 1px solid #dadada;
`

export const ChatBtn = styled.button<BtnProps>`
    width: 100px;
    height: 34px;
    color: ${(props) => props.$textColor};
    background-color: ${(props) => props.$buttonColor};
    border: none;
    border-radius: 8px;
`