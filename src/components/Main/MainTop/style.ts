import styled from 'styled-components'

export const TopContainer = styled.div`
    /* max-width: 1000px; */
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    margin: 0 auto;
`

export const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-content: center;
    margin-top: 100px;
    /* width: calc(100% - 40px); */
`

export const Inside = styled.div`
    /* flex: 0 0 calc(33.333% - 10px); */
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 3.339px 3.339px 16.693px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    position: relative;

    &:nth-child(odd) {
        /* align-self: flex-start; */
        height: 313px;
        margin-top: 50px;

        /* margin-bottom: 50px; */
    }
    &:nth-child(even) {
        /* align-self: flex-end; */
        height: 230px;
    }
    &:nth-child(5) {
        /* align-self: flex-end; */
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