import { useState } from 'react'

const UseMouseOver = () => {
    const [isMouseOver, setIsMouseOver] = useState(false)

    const handleMouseOver = () => {
        setIsMouseOver(true)
    }

    const handleMouseOut = () => {
        setIsMouseOver(false)
    }

    return {
        isMouseOver,
        handleMouseOver,
        handleMouseOut,
    }
}

export default UseMouseOver
