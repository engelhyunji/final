import React from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'

interface AddShopModalProps {
    onClose: () => void
}

const AddShopModal: React.FC<AddShopModalProps> = ({ onClose }) => {
    const navigate = useNavigate()

    return (
        <ST.ShopModalBackground>
            <ST.ShopBoxDiv>
                <ST.LeaveBtn onClick={onClose}>
                    x
                </ST.LeaveBtn>

                <ST.ShopSpan>가게를 운영하는 사장님이라면?</ST.ShopSpan>
                <ST.TitleH3>지금 바로 우리 가게 등록하러 가기!</ST.TitleH3>

                <ST.ChatBtn $textColor="#fff" $buttonColor="#00bd8f" onClick={()=>navigate('/shops')}>
                    가게 등록하기
                </ST.ChatBtn>
            </ST.ShopBoxDiv>
        </ST.ShopModalBackground>
    )
}

export default AddShopModal
