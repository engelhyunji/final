import styled from 'styled-components'

export const TopContainer = styled.div`
    margin: 0 auto;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-content: center;
    margin-top: 100px;
`

export const Inside = styled.div`
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 3.339px 3.339px 16.693px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    position: relative;
    width: 320px;


    &:nth-child(odd) {
        height: 313px;
        margin-top: 50px;

    }
    &:nth-child(even) {
        height: 230px;
    }
    &:nth-child(5) {
        height: 313px;
        margin-top: -135px;
    }

    &:hover {
        & > img {
            filter: brightness(0.8);
        }
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
`