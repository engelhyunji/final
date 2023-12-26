import styled from 'styled-components'

export const TopContainer = styled.div`
    max-width: 1280px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Text = styled.h2`
    font-size: 35px;
    font-weight: bold;
    margin-bottom: 20px;
`

export const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 600px;
    margin: auto; // Centers the content block
`

export const Inside = styled.div`
    flex: 0 0 calc(33.333% - 20px);
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    &:nth-child(odd) {
        align-self: flex-start;
    }
    &:nth-child(even) {
        align-self: flex-end;
        margin-top: 100px;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
