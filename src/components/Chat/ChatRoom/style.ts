import styled from 'styled-components'

export const ChatRContainer = styled.div`
    max-width: 1200px;
    margin: 66px auto 0;
    font-family: Pretendard-bold;

    /* border-radius: 10px; */
    /* border: 1px solid #dadada; */

    display: flex;
    justify-content: center;
`
export const MessageLeftDiv = styled.div`
    width: 387px;
    padding: 0 50px 0;
    border: 1px solid #dadada;
    border-radius: 10px 0px 0px 0px;
    background-color: #fff;
`
export const ChatMemberContainer = styled.div`
    width: 100%;
    overflow-y: auto;
`
export const ChatMemberP = styled.p`
    padding: 31px 0 0;
    height: 71px;
`
export const ChatMemberSpan = styled.span`
    font-family: Pretendard-regular;
    color: #575756;
`
export const ChatMemberWrap = styled.div`
    width: 100%;
    height: 65vh;
    overflow-y: auto;
    border-bottom: 1px solid #dadada;
`

export const ChatMemberDiv = styled.div`
    width: 100%;
`
export const ChatPetDiv = styled.div`
    width: 100%;
    margin: 10px 0;
    display: flex;
`

export const ChatPetImg = styled.img`
    width: 58px;
    height: 58px;
    object-fit: cover;
    border-radius: 58px;
`
export const ChatPetInfoDiv = styled.div`
    margin: 10px;
    font-size: 15px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    span {
        // 넘치는 내용 처리
        display: inline-block;
        white-space: nowrap; // 자동 줄바꿈 방지
        overflow: hidden; // 넘치는 부분 화면에서 숨김
        text-overflow: ellipsis; // 숨긴 부분 말줄임표(...) 처리
    }
    p {
        font-family: Pretendard-regular;
        font-size: 12px;
        color: #8f8e93;
    }
`
export const LeaveDiv = styled.div`
    width: 100%;
    padding: 48px 0;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ChatLeaveBtn = styled.button`
    height: 51px;
    padding: 15px 54px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`

// 오른쪽 영역 =======================

export const MessageRightDiv = styled.div`
    width: 813px;
    background-color: #fff;
`
export const ChatH2 = styled.h2`
    width: 814px;
    height: 71px;
    padding: 22px 37px;
    border-radius: 0px 10px 0px 0px;
    border: 1px solid #dadada;

    font-size: 22px;
    font-family: Pretendard-bold;
`

export const MessageUl = styled.ul`
    width: 100%;
    height: 65vh;
    overflow-y: auto;
    padding: 20px;
    font-family: Pretendard-medium;
    background-color: #f4f4f4;

    box-shadow: inset -10px 2px 20px 1px rgba(77, 71, 71, 0.2);
`

export const MessageLi = styled.li`
    text-align: center;
    margin: 10px 0;

    &.otherChat {
        text-align: left;
    }

    &.myChat {
        text-align: right;
    }
`

export const MessageDiv = styled.div`
    &.otherMsg {
        span {
            margin-top: 5px;
            display: inline-block;
            padding: 8px 10px;
            border-radius: 2px 16px 16px 2px;
            background-color: #fff;
        }
    }

    &.myMsg {
        span {
            display: inline-block;
            padding: 8px 10px;
            border-radius: 16px 2px 2px 16px;
            background-color: #00d498;
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

// export const MessageTimeSpan = styled.span`
//     display: inline-block;
//     background-color: transparent;
// `

// 메세지 입력
export const MessageInputDiv = styled.div`
    width: 813px;
    height: 146px;
    padding: 48px 30px;
    background-color: #fff;
    border: 1px solid #dadada;

    font-family: Pretendard-regular;

    display: flex;
    align-items: center;
    gap: 12px;
`

export const MessageInput = styled.input`
    width: 580px;
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
    width: 50px;
    text-align: right;
    font-size: 12px;
    color: #bbb;
`
export const MessageLimitRed = styled.p`
    width: 50px;
    text-align: right;
    font-size: 12px;
    color: #fd4141;
`
export const MyBtn = styled.button`
    height: 48px;
    padding: 10px 33px;

    font-size: 16px;
    color: #00bd8f;
    font-family: Pretendard-medium;

    background-color: #e9e9e6;
    border: none;
    border-radius: 8px;
`
