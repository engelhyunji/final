import React, { ChangeEvent, useState } from 'react'
import * as ST from './style'
import { useNavigate } from 'react-router-dom'
import instance from '../../apis/instance'
import { useAuth } from '../../context/AuthContext'

interface LeaveUserModalProps {
    onClose: () => void
}

const LeaveUserModal: React.FC<LeaveUserModalProps> = ({ onClose }) => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const [password, setPassword] = useState<string>('')

    const LeaveUserHandler = async () => {
                try {
                    await instance.delete('/api/user/delete', { data: { password } })
                    logout()
                    alert('회원탈퇴가 완료되었습니다')
                    navigate('/')
                } catch (err) {
                    console.log(err)
                    alert('비밀번호가 일치하지 않습니다')
                }
    }

    return (
        <ST.ShopModalBackground>
            <ST.ChatInputDiv>
                <ST.LeaveBtn onClick={onClose}>
                    x
                </ST.LeaveBtn>

                <ST.ShopSpan>정말로 탈퇴하실건가요?😿</ST.ShopSpan>
                <ST.TitleH3>비밀번호를 입력하시면 회원탈퇴가 완료됩니다🙊</ST.TitleH3>
                <ST.ChatNameInput
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <ST.ChatBtn $textColor="#FD4141" $buttonColor="#E9E9E6" onClick={LeaveUserHandler}>
                    탈퇴 완료하기
                </ST.ChatBtn>
            </ST.ChatInputDiv>
        </ST.ShopModalBackground>
    )
}

export default LeaveUserModal
