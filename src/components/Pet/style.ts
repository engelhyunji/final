import styled from 'styled-components'
import { StatusMessageProps } from './Pet'

export const Container = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Form = styled.form`
    max-width: 474px;
    margin: 50px auto;
    z-index: 2;
`
export const Text = styled.h2`
    margin: 70px 0 20px;
    position: relative;
    z-index: 2;

    color: #fff;
    font-size: 30px;
    font-family: Pretendard-medium;
`

export const LoginP = styled.p`
    margin: 0 0 50px;
    z-index: 2;

    color: #fff;
    text-align: center;
    font-family: Pretendard-regular;
`

export const PetInputBox = styled.div`
    margin: 30px 0;
`

export const FormTitle = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    font-weight: bold;
`

export const FormGroup = styled.div`
    margin-bottom: 1rem;
`

export const Label = styled.label`
    margin: 10px 0;
    font-family: Pretendard-bold;
    font-size: 18px;
`

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 100px;
`

export const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`

export const Button = styled.button`
    width: 100%;
    padding: 0.7rem;
    border: none;
    border-radius: 4px;
    background-color: #1dcb8e;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;

    &:hover {
        background-color: #1dcb8e;
    }
`

export const StatusMessage = styled.p<StatusMessageProps>`
    padding: 0.5rem;
    margin-top: 1rem;
    text-align: center;
    color: red;
    background-color: #fff;
    border-radius: 4px;
    display: ${(props) => (props.message ? 'block' : 'none')};
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

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
