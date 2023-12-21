import styled from 'styled-components'

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2%;
    overflow-y: auto;
    width: 100%;
    max-width: 600px;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`

export const Text = styled.h1`
    color: #333;
    margin-bottom: 20px;
`

export const Form = styled.form`
    width: 100%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const Label = styled.label`
    display: block;
    margin: 10px 0;
    font-weight: bold;
`

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 5px 0 15px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`

export const Textarea = styled.textarea`
    width: 100%;
    padding: 10px;
    margin: 5px 0 15px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
`

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin: 5px 0 15px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
`

export const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
`

export const Button = styled.button`
    flex: 1; // 모든 버튼이 동일한 크기를 가짐
    padding: 15px;
    border: none;
    border-radius: 5px;
    background-color: #1dcb8e;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: gray;
        opacity: 0.7;
    }

    &:last-child {
        margin-right: 0;
    }
`

export const Image = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
