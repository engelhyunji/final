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

    /* linear-gradient(검정색 필터로 활용) */
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));

    // 가상 요소 만들어서 배경만 흐리게
    &::before {
        content: '';
        z-index: -1; /* 콘텐츠 뒤로 */
        width: 100%;
        height: 100%;
        /* 부모 기준으로 위치 맞춰야 높이 적용됨 */
        position: absolute;
        top: 0;
        left: 0;

        background-image: url('PetList.png');
        background-size: cover; 
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 23px;
`

export const ProfileContainer = styled.div`
    width: 100%;
    /* padding: 20px; */
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
    font-family: Pretendard-bold;
    font-size: 48px;
`

export const Button = styled.button``

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    grid-gap: 15px; // Space between posts
    padding: 120px; // Padding around the grid
    width: 100%;
    margin-top: 90px;
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
    aspect-ratio: 1 / 1; // Keep the items square
    width: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    background: #fafafa; // Instagram-like background for posts
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Soft shadow like Instagram

    &:hover {
        opacity: 0.8; // Slight dim on hover
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensure images cover the square area
`
export const Image = styled.img``

export const PetSearchContainer = styled.div`
    width: 745px;
    padding: 19px 33px;
    top: 270px;
    /* height: 131px; */

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
    align-items: center;
    justify-content: space-between;
`
export const PetSearchCondition = styled.div`
    width: 109px;
    height: 40px;
    padding: 11px 15px;
    border-radius: 26px;
    border: 1px solid #dadada;
    color: #8f8e93;
    font-size: 16px;
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
