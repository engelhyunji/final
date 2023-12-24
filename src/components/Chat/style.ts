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
    max-width: 1280px;
    margin: 50px;
`

export const ChatH2 = styled.h2`
    font-size: 20px;
    font-weight: 700;
`

export const ChatInputDiv = styled.div`
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 12px;
`

export const ChatLabel = styled.label``

export const ChatNameInput = styled.input``

export const ChatBtn = styled.button``

export const ChatLists = styled.div`
    width: 100%;
`

export const ChatList = styled.div`
    width: 100%;
    margin: 12px 0;
`

// =====ChatRoom 컴포넌트======
export const MessageContainer = styled.div`
    margin: 30px 0;
`
export const MessageInfoContainer = styled.div`
    margin: 30px 0;

    display: flex;
    align-items: center;
    gap: 12px;
`

export const MessageListContainer = styled.div`
    width: 1440px;
    /* height: 500px; */
`

export const MessageUl = styled.ul`
    width: 60%;
    /* height: 500px; */
    padding: 20px;
    border-radius: 8px;
    background-color: #eee;
`

export const MessageLi = styled.li`
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
            background-color: #00bd8f;
        }
    }
`

// 메세지 입력
export const MessageInputDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`
