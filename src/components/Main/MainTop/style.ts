// import styled from 'styled-components'

// export const TopContainer = styled.div`
//     max-width: 1800px;
//     margin: 50px auto;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
// `

// export const Text = styled.h2`
//     font-size: 35px;
//     font-weight: bold;
//     margin-bottom: 20px;
// `

// export const Content = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     gap: 20px;
//     max-width: 600px;
//     margin: auto;
// `

// export const Inside = styled.div`
//     flex: 0 0 calc(33.333% - 20px);
//     height: 213px;
//     flex-shrink: 0;
//     overflow: hidden;
//     border-radius: 15px;
//     box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

//     &:nth-child(odd) {
//         align-self: flex-start;
//         /* flex-basis: calc(50% - 20px);  */
//         flex-basis: calc(33.333% 250px);
//         height: 213px;
//     }
//     &:nth-child(even) {
//         align-self: flex-end;
//         /* flex-basis: calc(40% - 20px); */
//         flex-basis: calc(33.333% 250px);
//         height: 230.357px;
//         margin-top: 50px;
//     }
// `

// export const Img = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `

import styled from 'styled-components'

export const TopContainer = styled.div`
    max-width: 2000px;
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
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px;
    max-width: 2000px;
    margin: auto;
`

export const Inside = styled.div`
    height: 213px;
    overflow: hidden;
    border-radius: 15px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    &:nth-child(odd) {
        align-self: flex-start;
        height: 213px;
    }
    &:nth-child(even) {
        align-self: flex-end;
        height: 230.357px;
        margin-top: 50px;
    }
`

export const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
