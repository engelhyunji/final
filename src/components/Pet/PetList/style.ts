import styled from 'styled-components'

export const Back = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`

export const Wrap = styled.div`
    /* width: 80%; */
    /* max-width: 1200px; */
    /* position: absolute; */
    left: 200vh;
`

export const ProfileContainer = styled.div`
    position: absolute;
    top: 10vh;
    right: 1%;
    left: 450.99px;
    width: 70%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Name = styled.div`
    top: 5vh;
    right: 10;
    display: flex;
    text-align: center;
    color: green;
    margin-bottom: 20px;
    font-size: 20px;
`

export const ProfilePicture = styled.img`
    justify-content: space-between;
    margin-right: 400px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
`

export const ChangePictureButton = styled.label`
    cursor: pointer;
    color: #ffffff;
    margin-top: 30px;
    margin-left: 3vh;
    display: inline-block;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: bold;
    height: 15.9px;
    border: 1px solid #83858a;
    background-color: #83858a;
    border-radius: 8px;
    transition: background-color 0.3s;
    position: relative;
    display: flex;

    &:hover {
        background-color: #f5f5f5;
        color: white;
    }

    input {
        display: none;
    }
`

export const StatItem = styled.div`
    text-align: center;
    color: #f5f5f5;
    cursor: pointer;
    flex-direction: column;
    flex-grow: 1;
    margin: auto;
`

export const Posts = styled.div`
    display: grid;
    margin-right: 100vh;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(200px, 1fr));
    gap: 15px;
    margin: 3%;
`

export const ImgCard = styled.div`
    display: grid;
    width: 100vh;
    height: 100vh;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, minmax(200px, 1fr));
    gap: 15px;
    margin: 5px;
`

export const Text = styled.div`
    margin-top: 20px;
    border: 1px solid #ccc;
    font-size: 20px;
    font-weight: bold;
`
export const PetItem = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
`

export const Content = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
`
export const PostContainer = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    aspect-ratio: 1/1;
    width: 250px;
    height: 250px;
`

export const Button = styled.div`
    cursor: pointer;
    color: #ffffff;
    margin-top: 30px;
    display: inline-block;
    margin-bottom: 3vh;
    padding: 8px 16px;
    font-size: 17px;
    font-weight: bold;
    height: 30px;
    border: 1px solid #1dcb8e;
    background-color: #1dcb8e;
    border-radius: 8px;
    transition: background-color 0.3s;
    position: relative;
    display: flex;

    &:hover {
        background-color: #f5f5f5;
        color: white;
    }

    input {
        display: none;
    }
`

// 카테고리 이미지
export const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover; // 이미지 비율 유지
`
