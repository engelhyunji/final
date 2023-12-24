import React, { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

// LinkProps를 확장하여 Link가 지원하는
// to 프롭 및 기타 프롭에 대한 자동 완성 및 타입 체크를 보장
interface NoLineLinkProps extends LinkProps {
    children: ReactNode // 자식 요소는 어떤 JSX 내용이든 허용
}

// 스프레드 연산자를 사용하여 Link가 받을 수 있는 추가적인 프롭 전달
const NoLineLink: React.FC<NoLineLinkProps> = ({ to, children, ...rest }) => (
    <Link
        to={to}
        style={{
            textDecoration: 'none',
            color: '#000000',
            display: 'inline-block',
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Pretendard-SemiBold',
            marginLeft: '36px',
        }}
        {...rest}
    >
        {children}
    </Link>
)

export default NoLineLink
