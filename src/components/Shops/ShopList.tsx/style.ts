import styled from 'styled-components'
import { Row } from 'react-bootstrap'


export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`
export const ShopP = styled.p`
    margin: 0 0 50px;
    z-index: 2;

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const TitleBackContainer = styled.div`
    max-width: 1440px;
    height: 340px;

    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* position: absolute; */
    /* z-index: 1; // 제일 뒤로 */
`

export const ShopListH2 = styled.h2`
    color: #fff;
    font-family: Pretendard-medium;
    font-size: 48px;
`
export const ShopListContainer = styled.div`
    max-width: 358px;
    height: 454px;

    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const ShopListH3 = styled.h3`
    margin: 103px 0;
    font-family: Pretendard-bold;
    font-size: 30px;
`

export const StRow = styled(Row)`
    margin: 0 100px;
`;


export const ShopBox = styled.div`
    max-width: 358px;
    height: 454px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    font-family: Pretendard-medium;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }
`
export const thumImg = styled.img`
    max-width: 358px;
    height: 269px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`
export const CardBodyDiv = styled.div`
    width: 100%;
    padding: 26px 36px;
    overflow: hidden;

`
export const ShopListH4 = styled.h4`
    font-family: Pretendard-bold;
    font-size: 20px;
    margin: 0 0 16px;
`
export const ShopGrid = styled.div`
    width: 100%;
    color: #8f8e93;
    font-size: 16px;
    font-family: Pretendard-regular;

    display: inline-block;
    width: 300px;
    white-space: nowrap; // 자동 줄바꿈 방지
    overflow: hidden; // 넘치는 부분 화면에서 숨김
    text-overflow: ellipsis; // 숨긴 부분 말줄임표(...) 처리

    display: grid;
    grid-template-columns: 0.8fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 8px 10px; // 브라우저 호환 범위 넓히기 위해 작성
    gap: 8px 10px;
`
export const BodyTimeP = styled.p`
    grid-column: 1 / 3;
    grid-row: 1 / 3;
`
export const BodyTimeInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 1 / 2;
`
export const BodyTelP = styled.p`
    grid-column: 1 / 3;
    grid-row: 2 / 3;
`
export const BodyTelInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 2 / 3;
`
export const BodyAddressP = styled.p`
    grid-column: 1 / 3;
    grid-row: 3 / 4;
`
export const BodyAddressInfoP = styled.p`
    grid-column: 2 / 4;
    grid-row: 3 / 4;
`
export const CardBodyP = styled.p`
    grid-column: 1 / 3;
    grid-row: 4 / 5;
`
