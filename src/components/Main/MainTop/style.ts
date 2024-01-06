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

// export const Inside = styled.div`
//     top: 50%;
//     left: 50%;
//     overflow: hidden;
//     border-radius: 15px;
//     box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
//     align-content: center;

//     &:nth-child(odd) {
//         grid-column: span 1;
//         grid-row-end: span 2; // 더 높은 아이템을 만들기 위해 2행에 걸침
//         width: 324.035px; // 아이템들이 서로 가까이 있도록 폭을 조정할 필요가 있음
//         height: 313px;
//     }
//     &:nth-child(even) {
//         grid-column: span 1;
//         grid-row-end: span 1; // 더 짧은 아이템을 만들기 위해 1행에 걸침
//         width: 323px; // 위와 동일하게 폭 조정
//         height: 230.357px;
//     }
//     &:nth-child(4n + 1) {
//         grid-column-start: 1; // 네 번째 아이템마다 첫 번째 컬럼에서 시작
//     }
//     &:nth-child(4n + 2) {
//         grid-column-start: 2; // 네 번째 아이템에 2를 더한 아이템은 두 번째 컬럼에서 시작
//     }
//     &:nth-child(4n + 3) {
//         grid-column-start: 3; // 네 번째 아이템에 3을 더한 아이템은 세 번째 컬럼에서 시작
//     }
//     &:nth-child(4n) {
//         grid-column-start: 2; // 네 번째 아이템마다 두 번째 컬럼에서 시작
//     }
// `

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
