import React, { ReactNode } from 'react'
import ReactDom from 'react-dom'

interface ModalPortalProps {
    children: ReactNode
}

// modal 컴포넌트를 Portal 시켜줄 ModalPortal.ts
const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
    const el = document.getElementById('modal')
    if (!el) {
        throw new Error('Modal root element not found')
    }
    return ReactDom.createPortal(children, el)
}

export default ModalPortal
