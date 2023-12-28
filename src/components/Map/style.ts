import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    height: 100vh;
    background: #fff;
    padding: 20px;
`

// export const SearchContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     background: #f9f9f9;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     border-radius: 8px;
//     width: 20%;
//     margin-right: 20px;
//     padding: 20px;
// `

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    /* width: 20%; */ /* 주석 처리하여 너비를 설정하지 않음 */
    margin-right: 20px;
    padding: 20px;
`


export const Input = styled.input`
    width: 100%;
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
    width: 100%;
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

export const ResultsContainer = styled.div`
    margin-top: 20px;
`
// export const ListContainer = styled.div`
//     width: 100%;
//     margin-top: 20px;
//     background: white;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
//     border-radius: 8px;
//     overflow: hidden;
// `

// export const ListItem = styled.div`
//     padding: 10px 15px;
//     border-bottom: 1px solid #ddd;
//     &:last-child {
//         border-bottom: none;
//     }
//     cursor: pointer;
//     &:hover {
//         background-color: #f3f3f3;
//     }
// `
export const InfoWindowContent = styled.div`
    max-width: 200px;
    padding: 10px;
    font-size: 14px;
`

export const MapContainer = styled.div`
    flex-grow: 1;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
export const Text = styled.div`
    padding: 5px;
    color: #00000a;
    font-size: 14px;
    text-align: center;
    max-width: 200px;
    white-space: normal;
    margin: auto;
    position: relative;
    text-align: left;
    max-width: 200px;
`

export const CustomOverlayStyle = styled.div`
    background: white;
    border-radius: 6px;
    border: 1px solid #ddd;
    padding: 8px 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    position: absolute;
    transform: translate(-50%, -100%); /* 정확한 위치 조정을 위해 */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    pointer-events: none; /* 마커 위 텍스트 상자에 마우스 이벤트 무시 */
`
export const AddressText = styled.div`
    padding: 5px;
    color: #333;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
`
export const ListContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    overflow-y: auto;
    opacity: 0.7;
`
export const PhoneText = styled.div`
    padding: 5px;
    color: #1dcb8e;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
    font-weight: bold;
`
export const Img = styled.div``

export const ImagePreview = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 10px;
    display: none;
`
export const ListItem = styled.div`
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    &:last-child {
        border-bottom: none;
    }
    cursor: pointer;
    &:hover {
        background-color: #f3f3f3;
    }

    &.active {
        background-color: #1dcb8e; // 활성화될 때 초록색으로 변경
    }
`

// export const PageNumber = styled.button`
//     background-color: transparent;
//     border: none;
//     padding: 5px 10px;
//     margin: 0 5px;
//     cursor: pointer;
//     &:hover {
//         background-color: #f3f3f3;
//     }
// `

export const PageNumber = styled.div`
    /* 페이지 번호 스타일을 정의하세요. */
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
    color: #333;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &.active {
        background-color: #333;
        color: #fff;
    }
`;

export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`

export const SearchAndListContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
