import styled from 'styled-components'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`
export const TitleBackContainer = styled.div`
    width: 100%;
    height: 340px;
    position: relative;
    overflow: hidden;

    color: #fff;
    font-family: Pretendard-medium;

    &::before {
        content: '';
        z-index: -1; 
        width: 100%;
        height: 325px;
        position: absolute;
        top: 0;
        left: 0;

        background-image: url('/PetList.png');
        background-size: cover;
    }

    position: relative;
    overflow: hidden;

    color: #fff;
    font-family: Pretendard-medium;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 23px;
`

export const ProfileContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const PetP = styled.p`
    margin: 0 0 10px;
    /* z-index: 2; */

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const PetListH2 = styled.h2`
    color: #fff;
    font-family: 'LOTTERIACHAB';
    font-size: 48px;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: #005d32;
`
export const ShopP = styled.p`
    margin: 0 0 10px;
    /* z-index: 2; */

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const Button = styled.button`
    background: linear-gradient(45deg, #fffbb4 0%, #4df9b1 25%, #ffffcf 50%, #00bd8f 75%, #00f8a9 100%);
    color: #333; 
    text-shadow: 1px 1px 2px #fff; 
    padding: 15px 25px; 
    border: none;
    border-radius: 30px;
    font-family: Pretendard-medium;
    font-size: 18px; 
    font-weight: 450;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    display: inline-block;
    font-family: Pretendard;
    margin: 10px;

    &:hover {
        background: linear-gradient(45deg, #fffbb4 0%, #4df9b1 25%, #00bd8f 50%, #ffffcf 75%, #00f8a9 100%);
        transform: scale(1.05); 
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2); 
    }

    &:focus {
        outline: none;
    }
`;


export const Posts = styled.div`
    margin: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    grid-gap: 15px;
    padding: 120px;
    width: 100%;
    margin-top: -100px;
`
export const PetListContainer = styled.div`
    max-width: 1200px;
    min-width: 800px;

    font-family: Pretendard-medium;

    display: flex;
    flex-direction: column;
    justify-content: center;
`
export const PetListH3 = styled.h3`
    margin: 113px 0 -100px;
    font-family: Pretendard-bold;
    font-size: 30px;
    margin-bottom: -150px;
    margin-left: -195px;
`
export const PostContainer = styled.div`
    aspect-ratio: 1 / 1;
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        opacity: 0.8;
        & > button {
            display: block; 
        }
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
export const Image = styled.img``

export const PetSearchContainer = styled.div`
    width: 725px;
    /* height: 131px; */
    padding: 19px 33px;

    border-radius: 7px;
    background: #fff;
    box-shadow: 7px 7px 20px 0px rgba(0, 0, 0, 0.25);
    text-align: center;
    font-family: Pretendard-regular;

    overflow: visible;
    position: absolute;
    top: 290px;
    z-index: 10;

    display: flex;
    flex-direction: column;
`
export const PetSearchCondition = styled.div`
    width: 100%;
    height: 45px;
    padding: 11px 15px;
    text-align: center;
    border-radius: 26px;
    border: 1px solid #dadada;
    color: #8f8e93;
    font-size: 16px;
    box-shadow: 0px 4px 8px 0px rgba(76, 225, 161, 0.5);
`
export const PetSearchInput = styled.input`
    width: 407px;
    height: 51px;
    padding: 11px 18px;

    border-radius: 7px;
    border: 1px solid #dadada;
    background: #f8f8f8;
    color: #8f8e93;
`
export const SearchBtn = styled.button`
    height: 51px;
    padding: 15px 54px;
    color: #fff;
    font-family: Pretendard-medium;
    background-color: #00bd8f;
    border: none;
    border-radius: 8px;

    display: flex;
    justify-content: center;
    align-items: center;
`
export const Peth3 = styled.div`
    margin: 103px 0 20px;
    font-family: Pretendard-bold;
    font-size: 30px;
`
export const LikeButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    border: none;
    font-size: 30px;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        display: flex;
    }
`
