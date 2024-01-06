import styled, { css } from 'styled-components'

type CategoryItemProps = {
    $isSelected: boolean
}

export const CategoryContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`


export const CategoryList = styled.div`
    display: flex;
    justify-content: center;
    gap: 60px;
    width: 900px;
    margin-bottom: 20px;
    color: #a5aaac;
`

export const CategoryItem = styled.div<CategoryItemProps>`
    cursor: pointer;
    padding: 10px 20px;
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
    width: 90%;
`

export const ShopItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`

// export const StyledSlide = styled(Slider)`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: row;
//     margin: 0 -10px;
//     width: 90px;

//     .slick-slide {
//         margin: 0 10px;
//         transition: transform 0.3s ease;
//     }

//     .slick-prev,
//     .slick-next {
//         display: block;
//         background: #ddd;
//         border-radius: 50%;
//         padding: 300%;
//         &:hover {
//             background: #ccc;
//         }
//     }

//     .slick-list {
//         margin: 0 -1px;
//     }

//     .slick-slide > div {
//         padding: 0 -2px;
//     }

//     .slick-track {
//         display: flex;
//         align-items: center;
//         gap: 10px;
//     }
// `


// export const ShopCard = styled.div`
//     padding: 20px;
//     border: 1px solid #ddd;
//     border-radius: 10px;
//     /* width: 100%; */
//     height: 300px;
//     max-width: 250px;
//     min-width: 250px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: white;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     margin: 10px auto;
//     transition: transform 0.3s ease;

//     &:hover {
//         transform: scale(1.05);
//     }

//     p {
//         margin-top: 10px;
//         font-size: 14px;
//         text-align: center;
//     }

//     img {
//         width: 100%;
//         height: 300%;
//         max-height: 60%;
//         border-radius: 5px;
//         margin-top: 10px;
//         object-fit: cover;
//     }
// `

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

// export const ShopCard = styled.div`
//     padding: 20px;
//     border: 1px solid #ddd;
//     border-radius: 10px;
//     width: 100%;
//     height: 300px;
//     max-width: 250px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: white;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     margin: 10px auto;
//     transition: transform 0.3s ease;

//     &:hover {
//         transform: scale(1.05);
//     }

//     p {
//         margin-top: 10px;
//         font-size: 14px;
//         text-align: center;
//     }

//     img {
//         width: 100%;
//         height: 300%;
//         max-height: 60%;
//         border-radius: 5px;
//         margin-top: 10px;
//         object-fit: cover;
//     }
// `

export const ShopCard = styled.div`
    max-width: 250px;
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
