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

    color: #8f8e93;
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

// ================가게 목록페이지 등록유도 모달=========================
export const ShopModalBackground = styled.div`
    width: 100%;
    height: 100%;
    font-family: Pretendard-medium;

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(218, 218, 218, 0.5);
`

export const ShopBoxDiv = styled.div`
    width: 365px;
    height: 190px;
    border-radius: 15px;
    padding: 34px 46px;

    position: relative;
    top: 10vh;
    /* left: 10vw; */
    background: #fff;
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
`
export const LeaveBtn = styled.button`
    padding: 4px 7px 6px;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    color: #00bd8f;
    background-color: #E9E9E6;
    border: none;
    border-radius: 50%;
`

export const ShopSpan = styled.span`
    display: inline-block;
    font-family: Pretendard-regular;
    font-size: 16px;
    color: #8f8e93;
`

export const TitleH3 = styled.h3`
    font-size: 20px;
    font-family: Pretendard-bold;
    margin-bottom: 10px;
`
