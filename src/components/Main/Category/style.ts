import styled, { css } from 'styled-components'

type CategoryItemProps = {
    $isSelected: boolean
}

export const CategoryContainer = styled.div`
    width: 90%;
    margin: 0 auto;
`


export const CategoryList = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 900px; 
    padding-left: 70px;
    margin-left: 50px;
    margin-bottom: 30px;
    color: #4CE1A1;
    
`

export const CategoryItem = styled.div<CategoryItemProps>`
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 112px;
    border: 1px solid #4CE1A1;
    transition: background-color 0.3s ease;

    ${(props) =>
        props.$isSelected &&
        css`
            background-color: #4CE1A1;
            color: white;
        `}
`

export const ShopList = styled.div`
    width: 90%;
    padding-left: 100px;
`

export const ShopItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

export const ShopInfo = styled.div`
    margin: 0 10px;
`

export const Image = styled.img`
    width: 100%;
    height: auto;
`
export const ShopImageContainer = styled.img`
    width: 30px;
    height: auto;
`
export const Arrow = styled.div`
    color: lightgreen;
    font-size: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;

    &.slick-next {
        right: -15px;
    }

    &.slick-prev {
        left: -15px;
    }

    &:hover {
        color: #1dcb8e;
    }
`

export const ShopCard = styled.div`
    /* max-width: 250px; */
    width: 250px;
    height: 300px;
    margin: 10px;
    padding: 20px;

    border: 1px solid #ddd;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);

        img {
            filter: brightness(0.8);
        }
    }

    p {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
    }

    img {
        width: 100%;
        height: 100%;
        max-height: 65%;
        margin-bottom: 12px;

        border-radius: 5px;
        object-fit: cover;
        transition: filter 0.3s ease;
    }
`
