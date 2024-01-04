import styled from 'styled-components'

interface BtnProps {
    $textColor: string
    $buttonColor: string
    $marginRight?: string
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
    width: 613px;
    height: 348px;
    border-radius: 15px;
    padding: 52px 69px;

    position: relative;
    background: #fff;
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`

export const TitleH2 = styled.h2`
    font-size: 30px;
    font-family: Pretendard-bold;
`
export const MyChatSpan = styled.span`
    display: inline-block;
    font-family: Pretendard-regular;
    font-size: 20px;
    color: #8f8e93;
`

export const ChatNameInput = styled.input`
    width: 100%;
    padding: 11px 13px;
    margin: 20px;
    padding: 17px 18px;

    color: #8F8E93;
    font-family: Pretendard-regular;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid #dadada;
`

export const ChatBtn = styled.button<BtnProps>`
    width: 155px;
    height: 51px;
    font-size: 16px;
    color: ${(props) => props.$textColor};
    background-color: ${(props) => props.$buttonColor};
    border: none;
    border-radius: 8px;
    margin-right: ${(props) => props.$marginRight};
`
