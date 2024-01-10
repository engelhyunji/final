import styled from 'styled-components'

export const Wrap2 = styled.div`
    width: 30%;
    margin: 20px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: auto;
    background-color: #fff;
    padding-bottom: 50%;
`

export const Text = styled.div`
    font-size: 16px;
    color: #333;
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
    /* border-radius: 5px; */
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    justify-content: center;
    background: #fff;
    font-family: 'Pretendard Variable', sans-serif;
    width: 100%;
    max-width: 1440px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;
    height: 276px;
    background-image: url('/PetDetail.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 10;
    top: 0;
`

export const Name = styled.h1`
    color: #000;
    font-family: Pretendard Variable;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 100% */
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-bottom: 20px;
`

export const DetailLabel = styled.span`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 120% */
`
export const DetailLabel1 = styled.span`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    margin-left: -17px;
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
export const MultiLineText = styled.div`
    white-space: pre-line;
    margin-top: 86px;
`

export const TextContainer = styled.p`
    position: absolute;
    top: 100%;
    margin-top: -43px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    border: 1px solid var(--Gray-1, #dadada);
    background: #fff;
    box-shadow: 7px 7px 15px 0px rgba(0, 0, 0, 0.25);
    width: 630px;
    height: 349px;
    flex-shrink: 0;
`
export const TextContainer2 = styled.p`
    padding-left: 170px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

export const TextContainer3 = styled.p`
    padding-right: 450px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    flex-direction: row;
    justify-content: center;
`

export const TextLabel = styled.p`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    gap: 20px;
`
export const TextLabel1 = styled.p`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 120% */
    gap: 20px;
`
export const TextContent = styled.div`
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    display: flex;
    gap: 20px;
    margin-top: 7px;
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(250px, 1fr));
    grid-gap: 15px;
    padding: 120px;
    height: 100%;
    width: 100%;
    margin-top: 10px;
    margin-left: 100px;
`

export const ImgCard1 = styled.div`
    width: 290px;
    overflow: hidden;
    padding-left: 10px;
    margin-left: 100px;
    margin-right: 100px;
`
export const ImgCard = styled.div`
    float: left;
    margin-top: 33px;
    width: 348px;
    height: 300px;
    overflow: hidden;
    margin-bottom: 35px;
    margin-left: 390px;
    margin-right: 10px;
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Img2 = styled.img`
    width: 317px;
    height: 317px;
    border-radius: 50%;
    box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.25);
    object-fit: cover;
`
export const ModalContent = styled.div`
    position: relative;
    max-width: 600px;
    margin: auto;
    margin-top: 10%;
    width: 90vw;
    max-height: 80vh;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* border-radius: 10px; */
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ModalImage = styled.img`
    max-width: 100%;
    max-height: 75vh;
    /* border-radius: 10px; */
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
export const ImageContainer = styled.div`
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: -9rem;
    background-size: cover;
    background-position: center;
    z-index: 10;
    position: absolute;
    margin-top: 100px;
`
