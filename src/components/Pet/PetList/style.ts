import styled from 'styled-components'

export const Back = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 2rem;
`

export const ProfileContainer = styled.div`
    width: 90%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Name = styled.h2`
    text-align: center;
    color: green;
    margin-bottom: 20px;
`

export const Button = styled.button`
    // Your existing button styles
`

export const Posts = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 15px;
    width: 100%;
    margin-top: 20px;
`

export const PostContainer = styled.div`
    aspect-ratio: 1 / 1;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`
export const Image = styled.img`
`;