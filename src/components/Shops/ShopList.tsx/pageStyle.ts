import styled from 'styled-components'

export const pageContainer = styled.div`
    max-width: 230px;
    margin: 60px auto;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 43px;

    list-style: none; /* default 스타일(::marker) 제거 */

    li {
        color: #8F8E93;
        font-family: Pretendard-regular;

        &:hover,
        &:active,
        &.active {
            color: #000;
            text-decoration: underline;

        }

        a {
            width: 100%;
            height: 100%;
        }
    }
`