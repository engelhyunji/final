import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    /* padding: 85px 0; */
`
export const ReviewInputP = styled.p`
    width: 100%;
    font-family: Pretendard-regular;
    margin: 50px 0 30px;

    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
`
export const ReviewInput = styled.input`
    width: 407px;
    padding: 11px 13px;

    border-radius: 7px;
    border: 1px solid #dadada;
    background: #fff;
`
export const ReviewLength = styled.span`
        color: #fd4141;
`
export const AddBtn = styled.button`
    padding: 15px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;
`

export const ReviewH3 = styled.h3`
    margin: 46px 0 26px;
    font-family: Pretendard-bold;
    font-size: 22px;
    line-height: 28px;
`

export const ReviewListUl = styled.ul`
    width: 100%;

    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 14px;
`

export const ReviewListLi = styled.li`
    width: 390px;
    padding: 24px 36px;

    font-size: 20px;
    font-family: Pretendard-regular;

    border-radius: 10px;
    border: 0.5px solid #dadada;
    background: #fff;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
`

export const ReviewListP = styled.p`
    width: 100%;

    display: flex;
    justify-content: space-between;
`

export const ReviewNick = styled.span`
    font-size: 14px;
    font-family: Pretendard-regular;
    color: #8F8E93;
`
export const GoodBtn = styled.button`
    padding: 6px 8px 8px;
    font-size: 20px;
    /* color: #fff; */
    /* background-color: #00bd8f; */
    border: none;
    border-radius: 8px;
`

export const DelBtn = styled.button`
    width: 50px;
    height: 34px;
    color: #FD4141;
    font-size: 14px;
    font-family: Pretendard-Regular;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`