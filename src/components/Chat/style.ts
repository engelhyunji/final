import styled from 'styled-components'

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

export const ChatContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 150px;
    font-family: Pretendard-regular;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ChatListTitleWrap = styled.div`
    width: 100%;
    margin: 50px 0 0;
`
export const ChatH2 = styled.h2`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    text-align: left;
`
export const ChatH3 = styled.h3`
    font-size: 16px;
    font-weight: 600;
`

export const ChatInputDiv = styled.div`
    width: 100%;
    margin: 20px;
    /* padding: 20px 0 30px; */
    border-bottom: 1px solid #dadada;

    display: flex;
    align-items: center;
    gap: 12px;
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

export const TagWords = styled.span`
    cursor: pointer;
`

export const ChatLists = styled.div`
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

export const ChatListContainer = styled.div`
    margin: 12px;
`

export const ChatList = styled.div`
    cursor: pointer;
    max-width: 250px;
    padding: 10px;
    display: flex;
`
export const ChatListIcon = styled.div`
    width: 26%;
`
export const ChatListInfo = styled.div`
    width: 70%;
        p {
            // 넘치는 내용 처리
            width: 100%;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
`


export const ChatDelBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #fd4141;
    font-family: Pretendard-medium;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`

// ======= ChatRoom 컴포넌트 ======

export const ChatRContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 150px;
    font-family: Pretendard-regular;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
`
export const MessageContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`
export const MessageInfoContainer = styled.div`
    margin: 30px 0;

    display: flex;
    align-items: center;
    gap: 12px;

    span {
        max-width: 500px;
    }
`

export const ChatLeaveBtn = styled.button`
    width: 120px;
    height: 34px;
    color: #fd4141;
    font-family: Pretendard-medium;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`

export const MessageListContainer = styled.div`
    width: 100%;
    /* background-color: #fff; */
    display: flex;
`

export const MessageUl = styled.ul`
    width: 840px;
    height: 65vh;
    overflow-y: auto;

    padding: 20px;
    border-radius: 8px;
    background-color: #eee;

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
            color: #fff;
            display: inline-block;
            padding: 6px 10px;
            border-radius: 8px;
            background-color: #00bd8f;
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

export const ChatMemberContainer = styled.div`
    width: 300px;
    height: 65vh;
    overflow-y: auto;

    padding: 30px 20px;

    background-color: #fff;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
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

// 메세지 입력
export const MessageInputDiv = styled.div`
    width: 840px;
    height: 50px;
    padding: 50px 30px;
    margin: 10px 0;
    background-color: #eee;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
`

export const MessageInput = styled.input`
    width: 600px;
    height: 35px;
    padding: 10px;
    background-color: #fff;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
`
export const MyBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`
