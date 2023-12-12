import styled from 'styled-components';

export const Container = styled.div`
    width: 1000px;
    background-color: #eee;
    flex-direction: column;
    align-items: center;
    display: flex;
`;

export const Text = styled.h2`
    justify-content: space-between;
    display: flex;
    margin: 30px;
    font-weight: bold;
`;

export const Form = styled.form`
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

export const SelectContainer = styled.div`
    height: 5vh;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 7px;
    box-sizing: border-box;
`;

export const Select = styled.select`
    width: 98%;
    padding: 8px;
    outline: none;
    border: none;
    background-color: transparent;
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

// =====ShopList 컴포넌트======
export const thumImg = styled.img`
    max-width:300px;
    height: 300px;
`

// =====ShopDetail 컴포넌트======
export const detailImg = styled.img`
    max-width:300px;
    height: 300px;
`
//=====Modify 컴포넌트=====
