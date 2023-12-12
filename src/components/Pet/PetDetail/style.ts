import styled from 'styled-components'

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
`
export const PetDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`

// Label for pet details
export const DetailLabel = styled.span`
    font-weight: bold;
`

// Content text
export const Content = styled.span`
    font-weight: normal;
`

export const Image = styled.img`
    max-width: 100%;
    margin-bottom: 10px;
`

// Title text
export const Text = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`
