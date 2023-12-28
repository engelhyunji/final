import styled from 'styled-components'

export const DelBtn = styled.button`
    width: 100px;
    height: 34px;
    margin: 10px 0;
    font-size: 14px;
    font-family: Pretendard-Regular;
    background-color: #eee;
    border: none;
    border-radius: 8px;
`

export const ShopDetailContainer = styled.div`
    width: 1200px;
    margin: 60px auto 30px;
`

export const ShopImgBox = styled.div`
    width: 100%;
    height: 548px;
    /* margin: 44px auto 0; */
    overflow: hidden;

    border-radius: 15px;
    border: 1px solid #dadada;
    background: #fff;
    box-shadow: 7px 7px 15px 0px rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
`
export const detailImg = styled.img`
    width: 792px;
    height: 100%;
    object-fit: cover;
`
export const ShopImgInfo = styled.div`
    max-width: 408px;
    padding: 39px;
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

export const ShopCategoryUl = styled.ul`
    width: 100%;
    height: 155px;
    border-bottom: 1px solid #DADADA;

    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const ShopCategoryLi = styled.li`
    height: 100%;

    font-size: 18px;
    text-align: center;
    font-family: Pretendard-regular;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 21px;
`
export const ShopInfo = styled.p`
    font-size: 20px;
    line-height: 28px;

    font-family: Pretendard-medium;
`
export const ShopInfoContent = styled.p`
    font-size: 18px;
    line-height: 24px;
    font-family: Pretendard-bold;
`