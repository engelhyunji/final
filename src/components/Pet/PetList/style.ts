import styled from 'styled-components'

export const Content = styled.div`
    justify-content: center;
    /* display: flex; */
    margin-top: 10%;
    border: 1px solid #9ac8af;
`

export const Text = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 10%;
    margin-right: 20px;
    margin-bottom: 3vh;
    font-weight: bold;
`

export const Form = styled.form`
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`

export const PetDetailsContainer = styled.form`
    margin-left: 3vh;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`

export const DetailLabel = styled.label`
    margin-top: 1vh;
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    margin-bottom: 4px;
`

export const Label = styled.label`
    margin-top: 1vh;
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    margin-bottom: 4px;
`

export const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    resize: vertical;
`

export const Select = styled.label`
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    outline: none;
    transition: border-color 0.2s;

    &:hover,
    &:focus {
        border-color: #66afe9;
    }
`

export const Input = styled.input`
    height: 5vh;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 7px;
    background-color: #76777c;
    color: #fff;
    cursor: pointer;
`

export const Wrap = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid #f8f8f8;
    border-radius: 7px;
    background-color: #f8f8f8;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
`

export const List = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // 그리드 레이아웃 적용
    grid-gap: 20px;
    padding: 20px;
`

export const ListItem = styled.div`
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background: #fff; // 백그라운드 색상 추가
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
    transition: transform 0.3s ease-in-out; // 부드러운 호버 효과

    &:hover {
        transform: scale(1.05); // 호버 시 아이템 확대
    }
`

export const Image = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover; // 이미지 비율 유지
`
