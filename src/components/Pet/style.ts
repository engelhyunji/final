import styled from 'styled-components';

export const Content = styled.div`
    justify-content: center;
    display: flex;
    margin-top: 10%;
`;

export const Text = styled.div`
    justify-content: space-between;
    display: flex;
    margin-top: 10%;
    margin-right: 20px;
    margin-bottom: 3vh;
    font-weight: bold;
`;

export const Form = styled.div`
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`;

export const Label = styled.label`
    margin-top: 1vh;
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    margin-bottom: 4px;
`;

export const Input = styled.input`
    height: 5vh;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 7px;
    background-color: #76777c;
    color: #fff;
    cursor: pointer;
`;

export const Wrap = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid #f8f8f8;
    border-radius: 7px;
    background-color: #f8f8f8;
    color: #fff;
    cursor: pointer;
    overflow: hidden; 
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
`;