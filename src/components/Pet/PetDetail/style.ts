import styled from 'styled-components'

export const Wrap = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow-x: hidden;
    width: 100%;
    gap: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
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
    justify-content: space-around;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-image: url('/PetDetail.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding: 20px;
    margin: 30px auto;
    width: 90%;
`

export const Name = styled.h1`
    padding-left: 170px;
    font-size: 24px;
    color: #000;
    font-family: Pretendard Variable;
    font-size: 35px;
    font-style: normal;
    text-align: center;
    font-weight: 700;
    line-height: 36px;
`

export const DetailLabel = styled.span`
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    display: flex;
    flex-direction: row;
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
`

export const TextContainer = styled.p`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    flex-direction: row;
    justify-content: start;
    margin-top: 10px;
`
export const TextContainer2 = styled.p`
    padding-left: 170px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: start;
`

export const TextContainer3 = styled.p`
    padding-right: 450px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    flex-direction: row;
    justify-content: start;
`

export const TextLabel = styled.p`
    color: var(--Gray3, #575756);
    font-family: 'Pretendard Variable', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
    display: flex;
    white-space: normal;
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
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 35px;
    margin-left: 390px;
    margin-right: 10px;
`

export const Img = styled.img`
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
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
