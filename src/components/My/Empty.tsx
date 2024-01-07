import React from 'react'
import * as ST from './style'
// import { useNavigate } from 'react-router-dom'

const Empty: React.FC = () => {
    // const navigate = useNavigate()


    return (
        <ST.ShopNPetSection>
            <ST.EmptyP>등록된 가게 또는 반려동물 정보가 없습니다.
            <br /> 내 가게 또는 반려동물을 등록해보세요!</ST.EmptyP>
            {/* <ST.BtnContainer>
                <ST.MyChatBtn
                    onClick={() => {
                        navigate('/shops')
                    }}
                    $color="#00bd8f"
                    $backColor="#E9E9E6"
                >
                    가게 등록
                </ST.MyChatBtn>
                <ST.MyChatBtn
                    onClick={() => {
                        navigate('/pet')
                    }}
                    $color="#00bd8f"
                    $backColor="#E9E9E6"
                >
                    반려동물 등록
                </ST.MyChatBtn>
            </ST.BtnContainer> */}
        </ST.ShopNPetSection>
    )
}

export default Empty
