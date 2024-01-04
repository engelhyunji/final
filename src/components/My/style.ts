import styled from 'styled-components'

interface BtnProps {
    $color: string
}
interface ChatBtnProps {
    $color: string
    $backColor: string
}

export const MyContainer = styled.div`
    width: 1200px;
    margin: 68px auto;
    border-radius: 8px;
    font-family: Pretendard-regular;

    display: flex;
    flex-direction: column;
    align-items: left;
    z-index: 3;
`
export const TitleH2 = styled.h2`
    font-size: 30px;
    font-family: Pretendard-bold;
    display: flex;
    align-items: center;
    gap: 14px;
`

export const MyCategoryUl = styled.ul`
    width: 241px;
    margin: 30px 0 29px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const MyCategoryLi = styled.li`
    cursor: pointer;
    padding: 11px 26.8px;

    font-size: 18px;
    color: #8f8e93;
    text-align: center;
    font-family: Pretendard-medium;
    border-bottom: 1px solid #8f8e93;

    &:hover,
    &.active {
        font-family: Pretendard-semibold;
        color: #1d1d1b;
        border-bottom: 2px solid #000;
    }
`

export const ShopNPetSection = styled.section`
    margin: 0 0 58px;
`
export const MyUl = styled.ul`
    width: 100%;

    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
export const MyLi = styled.li`
    cursor: pointer;
    width: 240px;
    height: 340px;
    overflow: hidden;

    border-radius: 10px;
    background: #fff;
    box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25);

    &:hover {
        opacity: 0.8;
    }
`
export const MyDiv = styled.div`
    width: 100%;

    overflow: hidden;
    display: inline-block;
    white-space: nowrap; // 자동 줄바꿈 방지
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        font-size: 13px;
        color: #8f8e93;
    }
`
export const MyShopImg = styled.img`
    width: 100%;
    height: 186px;
    object-fit: cover;
`

export const MyInfo = styled.div`
    width: 100%;
    padding: 10px 26px 5px;
    /* display: flex;
    flex-direction: column;
    gap: 6px; */

    display: grid;
    grid-template-columns: 0.9fr 1fr 1fr;
    grid-template-rows: 1.5fr 1fr 1fr 1fr;
    grid-gap: 3px 0; // 브라우저 호환 범위 넓히기 위해 작성
    gap: 3px 0;

    p {
        // 넘치는 내용 처리
        display: inline-block;
        white-space: nowrap; // 자동 줄바꿈 방지
        overflow: hidden; // 넘치는 부분 화면에서 숨김
        text-overflow: ellipsis; // 숨긴 부분 말줄임표(...) 처리
    }
`
export const TitleH4 = styled.h4`
    margin: 5px 0;
    font-size: 16px;
    font-family: Pretendard-bold;

    grid-column: 1 / 4;
    grid-row: 1 / 2;
`
export const BodyTimeP = styled.p`
    grid-column: 1 / 3;
    grid-row: 2 / 4;
`
export const BodyTimeInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 2 / 3;
`
export const BodyTelP = styled.p`
    grid-column: 1 / 3;
    grid-row: 3 / 4;
`
export const BodyTelInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 3 / 4;
`
export const BodyAddressP = styled.p`
    grid-column: 1 / 3;
    grid-row: 4 / 5;
`
export const BodyAddressInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 4 / 5;
`

export const BtnContainer = styled.div`
    margin: 4px 0 0;
    display: flex;
    gap: 6.5px;
    justify-content: center;
`

export const MyBtn = styled.button<BtnProps>`
    width: 90px;
    height: 34px;
    color: ${(props) => props.$color};
    font-family: Pretendard-regular;
    background-color: #e9e9e6;
    border: none;
    border-radius: 3px;
`

export const TitleH3 = styled.h3`
    margin: 0 0 30px;
    font-size: 20px;
    font-family: Pretendard-semibold;
`
// export const MyChatSpan = styled.span`
//     display: inline-block;
//     margin: 0 0 24px;

//     font-size: 14px;
//     color: #575756;
// `

export const MyChatLi = styled.li`
    width: 284px;
    height: 182px;
    padding: 30px 26px;
    overflow: hidden;

    border-radius: 10px;
    background: #fff;
    border: 1px solid #dadada;
`

export const MyChatDiv = styled.div`
    font-size: 22px;
    font-family: Pretendard-semibold;

    margin-bottom: 22px;

    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    gap: 17px;

    p {
        width: 100%;
        display: flex;
        gap: 9px;
    }
`
export const MyChatP = styled.div`
    cursor: pointer;

    &:hover {
        color: #00bd8f;
    }
`
export const TagWords = styled.span`
    cursor: pointer;
    font-size: 11px;
    color: #4ce1a1;

    padding: 8px 19px;

    border-radius: 27.377px;
    border: 0.595px solid #4ce1a1;
    position: relative;

    &:hover {
        background-color: #fafafa;
    }
`

export const MyChatBtn = styled.button<ChatBtnProps>`
    width: 108px;
    height: 35px;
    color: ${(props) => props.$color};
    font-family: Pretendard-regular;
    background-color: ${(props) => props.$backColor};
    border: none;
    border-radius: 3px;
`

export const ShopNameH2 = styled.h2`
    width: 100%;
    margin-bottom: 30px;

    font-size: 42px;
    font-family: Pretendard-Bold;
`
export const ShopInfoP = styled.p`
    font-size: 18px;
    line-height: 28px;

    font-family: Pretendard-regular;
`

export const MyHashDeleteBtn = styled.button`
    width: 100px;
    height: 34px;
    color: #00bd8f;
    font-family: Pretendard-medium;
    background-color: #eee;
    border: none;
    border-radius: 8px;
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

export const LeaveSpan = styled.span`
    margin: 70px auto 0;
    color: #bbb;
`
