import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    height: 130vh;
    background: #fff;
    padding: 20px;
`

export const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 400px;
`
export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 600px;
    margin: auto;
`

export const H2 = styled.div`
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
    font-family: Pretendard-bold;
`
export const H3 = styled.div`
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
`

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`

export const ListMapContainer = styled.div`
    flex: 1;
    margin-top: 20px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    overflow-y: auto;
    opacity: 0.7;
`

export const Input = styled.input`
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 10px;
    border: 2px solid #ddd;
    border-radius: 20px;
    box-sizing: border-box;
    font-size: 15px;
    &:focus {
        border-color: #4ce1a1;
        outline: none;
    }
`

export const Button = styled.button`
    margin-bottom: 10px;
    margin-top: 30px;
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #4ce1a1;
    box-shadow: 0px 4px 8px 0px rgba(76, 225, 161, 0.5);
    border: none;
    background-color: #fff;
    color: #4ce1a1;
    text-transform: uppercase;
    border-radius: 47.609px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #4ce1a1;
        color: #fff;
    }
`

export const ListContainer = styled.div`
    flex: 1;
    margin-top: 20px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    overflow: hidden;
    overflow-y: auto;
`

export const MapContainer = styled.div`
    flex: 2;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const InfoWindowContent = styled.div`
    max-width: 200px;
    padding: 10px;
    font-size: 14px;
    opacity: 0.7;
    height: 200px;
`

export const ResultsContainer = styled.div`
    margin-top: 20px;
    overflow-y: auto;
    max-height: 719px; 
`
export const Text = styled.div`
    padding: 1px;
    padding-left: 9px;
    padding-bottom: 9px;
    margin-top: 9px;
    color: #000;
    font-family: Pretendard Variable;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    white-space: normal;
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
    transform: translate(-50%, -100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
    pointer-events: none;
`
export const AddressText = styled.div`
    padding: 1px;
    padding-bottom: 9px;
    color: #333;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
`

export const ShopTime = styled.div`
    padding: 1px;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
`

export const Wrap = styled.div`
    display: flex;
    margin-left: -44px;
    justify-content: space-around;
`
export const Wrap1 = styled.div`
    display: flex;
    gap: 30px;
    margin-right: 10px;
    width: 320px;
    border-radius: 7px;
    padding-left: 37px;
    justify-content: space-between;
`
export const Wrap2 = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 30px;
    width: 320px;
    border-radius: 7px;
    padding-left: -47px;
    justify-content: space-between;
    margin-bottom: -20px;
`
export const ShopTel = styled.div`
    padding: 5px;
    color: #4ce1a1;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
    font-weight: bold;
`
export const PhoneText = styled.div`
    padding: 1px;
    color: var(--Gray3, #575756);
    font-family: Pretendard Variable;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    font-size: 12px;
    max-width: 200px;
    white-space: normal;
    text-align: left;
`
export const Img = styled.div``
export const Image = styled.div`
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
export const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`
export const Image1 = styled.div`
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
`

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
    width: 400px;
    border-bottom: 1px solid #ddd;
    &:last-child {
        border-bottom: none;
    }
    cursor: pointer;
    &:hover {
        background-color: #f3f3f3;
    }

    &.active {
        border-radius: 7px;
        width: 380px;
        padding-left: 10px;
    }
`

export const PageNumber = styled.div`
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
`

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
