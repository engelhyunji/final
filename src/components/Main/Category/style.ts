import styled, { css } from 'styled-components'
import Slider from 'react-slick'

type CategoryItemProps = {
    $isSelected: boolean
}

export const CategoryContainer = styled.div`
    max-width: 1280px;
    margin: 200px auto 50px;
    width: 100%;
`

export const Text = styled.h2`
    font-size: 17px;
    margin-bottom: 30px;
`

export const CategoryList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    color: #a5aaac;
    font-weight: bold;
`

export const CategoryItem = styled.div<CategoryItemProps>`
    margin: 0 10px;
    cursor: pointer;
    padding: 10px;
    border-radius: 112px;
    transition: background-color 0.3s ease;

    ${(props) =>
        props.$isSelected &&
        css`
            background-color: #1dcb8e;
            color: white;
        `}
`

export const ShopList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

export const ShopItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

export const StyledSlide = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin: 0 -10px;

    .slick-slide {
        margin: 0 10px;
        transition: transform 0.3s ease;
    }

    .slick-prev,
    .slick-next {
        display: block;
        background: #ddd;
        border-radius: 50%;
        padding: 10px;
        &:hover {
            background: #ccc;
        }
    }
`

export const ShopCard = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    /* width: 100%; */
    height: 300px;
    max-width: 250px;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px auto;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    p {
        margin-top: 10px;
        font-size: 14px;
        text-align: center;
    }

    img {
        width: 100%;
        height: 300%;
        max-height: 60%;
        border-radius: 5px;
        margin-top: 10px;
        object-fit: cover;
    }
`

export const ShopInfo = styled.div`
    margin: 0 10px;
`

export const StyledSlickSlider = styled(Slider)`
    .slick-slide > div {
        margin: 0 10px;
    }
`

export const Image = styled.img`
    width: 30px;
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
