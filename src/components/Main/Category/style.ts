import styled, { css } from 'styled-components'
import Slider from 'react-slick'

type CategoryItemProps = {
    $isSelected: boolean
}

export const CategoryContainer = styled.div`
    max-width: 1280px;
    margin: 50px auto 50px;
    width: 100%;
    height: 500px;
    margin-top: 10px;
`

export const Text = styled.h2`
    font-size: 17px;
    margin-bottom: 30px;
`

export const CategoryList = styled.div`
    width: 45%;
    margin: 0 auto 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: #a5aaac;
`

export const CategoryItem = styled.div<CategoryItemProps>`
    margin: 0 10px;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 112px;
    transition: background-color 0.3s ease;
    color: #1dcb8e;
    border: 1px solid #1dcb8e;

    ${(props) =>
        props.$isSelected &&
        css`
            background-color: #1dcb8e;
            color: white;
        `}

    p {
        font-family: Pretendard-regular;
    }
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

// export const StSlide = styled(Slider)`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: row;
//     margin: 0 -10px;

//     .slick-slide {
//         margin: 0 10px;
//         transition: transform 0.3s ease;
//     }

//     .slick-prev,
//     .slick-next {
//         display: block;
//         background: #ddd;
//         border-radius: 50%;
//         padding: 10px;
//         &:hover {
//             background: #ccc;
//         }
//     }
// `

export const ShopSlideBox = styled.div`
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
`
export const ShopSlide = styled.div`
    width: 80%;
`
export const TextWrapper = styled.div`
    cursor: pointer;
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
export const ShopSlideP = styled.p`
    font-family: Pretendard-bold;
    font-size: 30px;
    color: #000;
`
export const ShopSlideP2 = styled.p`
    color: #8f8e93;
`

export const ShopCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 278px;
    height: 366px;

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

    img {
        width: 100%;
        height: 70%;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        object-fit: cover;
    }
`

export const ShopInfo = styled.div`
    width: 100%;
    padding: 20px;
    font-family: Pretendard-semibold;

    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const StyledSlickSlider = styled(Slider)`
    .slick-slide > div {
        /* margin: 0 10px; */
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
