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

// ========= ChatRoom 컴포넌트 =========

export const ChatRContainer = styled.div`
    max-width: 1200px;
    margin: 76px auto 0;
    font-family: Pretendard-bold;

    border-radius: 10px;
    border: 1px solid #dadada;

    display: flex;
    justify-content: center;
`
export const MessageLeftDiv = styled.div`
    width: 30%;
`
export const ChatMemberContainer = styled.div`
    width: 387px;
    height: 728px;
    overflow-y: auto;
    padding: 31px 50px;
    background-color: #fff;

    padding: 30px 20px;

    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
`
export const ChatMemberP = styled.p`
    font-size: 16px;
`
export const ChatMemberSpan = styled.span`
    font-family: Pretendard-regular;
    color: #575756;
`

export const ChatMemberDiv = styled.div`
    width: 100%;
    margin: 20px 0;
`
export const ChatPetDiv = styled.div`
    width: 100%;
    margin: 10px 0;
    display: flex;
`

export const ChatPetImg = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
`
export const ChatPetInfoDiv = styled.div`
    width: 100%;
    margin: 10px;
    display: flex;
    flex-direction: column;
    span {
        // 넘치는 내용 처리
        display: inline-block;
        white-space: nowrap; // 자동 줄바꿈 방지
        overflow: hidden; // 넘치는 부분 화면에서 숨김
        text-overflow: ellipsis; // 숨긴 부분 말줄임표(...) 처리
    }
`


export const MessageInfoContainer = styled.div`
    margin: 30px 0;
`

// export const MessageListContainer = styled.div`
//     width: 100%;
//     /* background-color: #fff; */
//     display: flex;
// `

export const MessageUl = styled.ul`
    width: 840px;
    height: 65vh;
    overflow-y: auto;

    padding: 20px;
    border-radius: 8px;
    background-color: #f4f4f4;

    box-shadow: inset -10px 2px 20px 1px rgba(77, 71, 71, 0.2);
`

export const MessageLi = styled.li`
    text-align: center;

    &.otherChat {
        text-align: left;
    }

    &.myChat {
        text-align: right;
    }
`

export const MessageDiv = styled.div`
    margin: 10px;

    &.otherMsg {
        span {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 8px;
            background-color: #fff;
        }
    }

    &.myMsg {
        span {
            display: inline-block;
            padding: 6px 10px;
            border-radius: 8px;
            background-color: #d8f7dc;
        }
    }

    &.enterNquit {
        span {
            display: inline-block;
            color: #bbb;
            text-align: center;
            padding: 10px 12px;
            border-radius: 20px;
            border: 2px solid #fff;
        }
    }
`



export const MessageRightDiv = styled.div`
    width: 70%;
    background-color: #fff;
`

export const LeaveDiv = styled.div`
    width: 387px;
    height: 146px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ChatLeaveBtn = styled.button`
    width: 120px;
    height: 34px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`

// 메세지 입력
export const MessageInputDiv = styled.div`
    width: 813px;
    height: 146px;
    padding: 50px 30px;
    margin: 10px 0;
    background-color: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
`

export const MessageInput = styled.input`
    width: 635px;
    height: 50px;
    padding: 20px;
    background-color: #eaeaea;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
`
export const MessageLimit = styled.p`
    width: 60px;
    text-align: right;
    font-size: 14px;
    color: #bbb;
`
export const MessageLimitRed = styled.p`
    width: 60px;
    text-align: right;
    font-size: 14px;
    color: #fd4141;
`
export const MyBtn = styled.button`
    height: 48px;
    padding: 10px 33px;
    color: #00bd8f;
    font-family: Pretendard-medium;
    background-color: #e9e9e6;
    border: none;
    border-radius: 8px;
`
