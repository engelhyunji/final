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

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 2vh;
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
    width: 100%;
    margin-top: 20px;
`

export const ImgCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 10px;
`

export const Img = styled.div`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`

export const Name = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 10px;
`

export const DetailLabel = styled.span`
    font-weight: bold;
    color: #333;
`

export const Text = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    text-align: center;
`

export const PetItem = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
