import styled from 'styled-components'

export const Wrap = styled.div`
    max-width: 1440px;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
`
export const Wrap2 = styled.div`
    width: 30%;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
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
    top: 50%;
    bottom: 50%;
    width: 60px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 120px;
    margin-top: 35px;
    justify-content: center;
    background: #fff;
    border-radius: 15px;
    font-family: 'Pretendard Variable', sans-serif;
    width: 100%;
    width: 1200px;
    height: 276px;
    flex-shrink: 0;
    background-image: url('/PetDetail.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

export const Name = styled.h1`
    /* gap: 10px; */
    font-size: 24px;
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
    font-weight: 400;
    line-height: 24px; /* 120% */
`

export const DetailText = styled.p`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #666;
    font-size: 18px;
`
export const TextContainer = styled.p`
    padding-left: 170px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    flex-direction: column;
    justify-content: start;
    margin-top: 10px;
`

export const H3 = styled.p`
    color: var(--Gray3, #575756);
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    grid-gap: 15px;
    padding: 120px;
    width: 100%;
    margin-top: 10px;
`

export const ImgCard1 = styled.div`
    width: 290px;
    overflow: hidden;
    padding-left: 10px;
    margin-left: 100px;
    margin-right: 100px;
`
export const ImgCard = styled.div`
    margin-top: 33px;
    width: 208px;
    height: 208px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 35px;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    &:hover {
        opacity: 0.8;
    }
`

export const Img2 = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
    &:hover {
        opacity: 0.8;
    }
`
export const ModalContent = styled.div`
    position: relative;
    max-width: 600px;
    margin: auto;
    margin-top: 10%;
    width: 90vw;
    max-height: 80vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ModalImage = styled.img`
    max-width: 100%;
    max-height: 75vh;
    border-radius: 10px;
`

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: #ffffff;
    color: #333;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    padding: 10px;
    &:hover {
        background-color: #f0f0f0;
    }
`
