import styled from 'styled-components'

interface ChatInfoProps {
    $width?: string
}

interface InfoImgProps {
    $ImgUrl?: string
}

export const EmptyWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`
export const EmptyText = styled.div`
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
`

//============================================

export const ChatContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 78px 120px 0;
    font-family: Pretendard-regular;

    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const ChatListTitleWrap = styled.div`
    width: 100%;
    margin: 0 0 48px;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 26px;
`
export const ChatH2 = styled.h2`
    font-size: 30px;
    font-family: Pretendard-bold;
    text-align: left;
`

export const AddChatBtn = styled.button`
    width: 238px;
    height: 43px;
    font-size: 20px;
    color: #8f8e93;
    font-family: Pretendard-regular;
    border: 1px solid #dadada;
    border-radius: 72px;
    background-color: #fafafa;
`
export const ChatHashDiv = styled.div`
    width: 100%;
    margin: 0 0 48px;

    display: flex;
    flex-direction: column;
    gap: 12px;
`
export const ChatH3 = styled.h3`
    font-size: 20px;
    font-family: Pretendard-bold;
    margin: 0 0 24px;
`
export const TagDiv = styled.div`
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
`
export const TagWords = styled.span`
    cursor: pointer;
    font-size: 18px;
    color: #4ce1a1;
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 11px 32px;
    border-radius: 46px;
    border: 1px solid #4ce1a1;
`
export const ChatLists = styled.div`
    max-width: 1200px;
    display: flex;
    flex-direction: column;
`

export const ChatList = styled.div`
    width: 100%;
    display: flex;
`

export const ChatListInfo = styled.div`
    width: 100%;
    padding: 18px 25px;
    border-bottom: 1px solid #dadada;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const ChatListInfoP = styled.p<ChatInfoProps>`
    width: ${(props) => props.$width};
    height: 51px;
    font-size: 16px;
    color: #8f8e93;
    // 넘치는 내용 처리
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    /* text-overflow: ellipsis; */
`
export const InfoRoomName = styled.span`
    font-size: 20px;
    color: #000;
`
export const InfoTagWords = styled.span`
    font-size: 16px;
    color: #4ce1a1;

    margin-right: 10px;
    padding: 8px 20px;
    border-radius: 46px;
    border: 1px solid #4ce1a1;
`
export const ChatListInfoImg = styled.span<InfoImgProps>`
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-left: 11px;
    border-radius: 32px;
    background: no-repeat center/110% url(${(props) => props.$ImgUrl}), lightgray 50%;
`

export const InBtn = styled.button`
    height: 51px;
    padding: 10px 33px;
    color: #00bd8f;
    font-family: Pretendard-medium;
    background-color: #ddd;
    border: none;
    border-radius: 8px;
`

// export const ChatLabel = styled.label``

export const ChatNameInput = styled.input`
    width: 407px;
    padding: 11px 13px;
    margin: 20px;

    border-radius: 7px;
    border: 1px solid #dadada;
`

export const ChatBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`