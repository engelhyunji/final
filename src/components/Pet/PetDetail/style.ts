import styled from 'styled-components'

export const Wrap = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
`
export const Wrap1 = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 100px;
    gap: 2rem;
    background: none;
    margin-left: 100px;
    height: 450px;
`

export const Text = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
`
export const Text1 = styled.div`
    font-size: 15px;
    font-weight: bold;
    padding-right: 25px;
    color: #333;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
`

export const PetItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 450px;
`

export const Button = styled.div`
    display: inline-block;
    background-color: #1dcb8e;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    margin-top: 10px;
    &:hover {
        background-color: #17b07e;
    }
`

export const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 10px;
`

export const DetailCard = styled.div`
    max-width: 300px;
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
    margin-right: 10px;
    height: 500px;
`

export const Name = styled.h1`
    padding-top: 20px;
    font-size: 24px;
    margin-bottom: 0.5rem;
    color: #000;

    font-family: Pretendard Variable;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 120% */
`

export const DetailLabel = styled.span`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
`

export const DetailText = styled.p`
    color: #666;
    font-size: 18px;
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: calc(100% - 250px);
    height: 500px;
    background: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const ImgCard1 = styled.div`
    width: 250px;
    overflow: hidden;
    padding-left: 10px;
`
export const ImgCard = styled.div`
    width: 200px;
    border-radius: 10px;
    overflow: hidden;
    padding-left: 10px;
`

export const Img = styled.img`
    width: 100%;
    height: auto;
    display: block;
    &:hover {
        opacity: 0.8;
    }
`

export const Img2 = styled.img`
    width: 100%;
    height: auto;
    display: block;
    border-radius: 50%;
    &:hover {
        opacity: 0.8;
    }
`
