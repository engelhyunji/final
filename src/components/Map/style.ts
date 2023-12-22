import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    height: 100%;
    margin: 20px;
`

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 100%;
`

export const Input = styled.input`
    width: 80%;
    padding: 12px 15px;
    margin-bottom: 10px;
    border: 2px solid #ddd;
    border-radius: 20px;
    box-sizing: border-box;
    font-size: 16px;
    &:focus {
        border-color: #1dcb8e;
        outline: none;
    }
`

export const Button = styled.button`
    margin-bottom: 10px;
    width: 80%;
    padding: 12px 15px;
    border: none;
    background-color: #1dcb8e; 
    color: white;
    text-transform: uppercase;
    border-radius: 20px; 
    cursor: pointer;
    font-size: 16px; 
    &:hover {
        background-color: #aec8b6; 
    }
`

export const MapContainer = styled.div`
    width: 70%;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const ResultsContainer = styled.div`
    margin-top: 20px;
`
