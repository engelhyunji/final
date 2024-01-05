import React, { useState, useEffect, useRef } from 'react'

interface TimerProps {
    mm?: string
    ss?: string
    isRunning: boolean
}

const intToString = (num: number): string => {
    return String(num).padStart(2, '0')
}

const Timer: React.FC<TimerProps> = ({ mm = '0', ss = '0', isRunning }) => {
    const MM = mm ? parseInt(mm) : 0
    const SS = ss ? parseInt(ss) : 0

    // 타이머 카운트 값 저장
    const count = useRef<number>(MM * 60 + SS)
    // 실행 중인 타이머 ID 저장
    const interval = useRef<number | null>(null)

    const [minute, setMinute] = useState<string>(intToString(MM))
    const [second, setSecond] = useState<string>(intToString(SS))

    const [isOver, setIsOver] = useState<boolean>(false)

    useEffect(() => {
        if (isRunning && !interval.current) {
            interval.current = window.setInterval(() => {
                if (interval.current !== null) {
                    // 값이 마이너스가 되지 않게
                    if (count.current > 0) {
                        count.current -= 1

                        setMinute(intToString(Math.floor(count.current / 60)))
                        setSecond(intToString(count.current % 60))
                    } else {
                        setIsOver(true)
                        clearInterval(interval.current)
                        interval.current = null
                    }
                }
            }, 1000)
        }

        return () => {
            if (interval.current !== null) {
                clearInterval(interval.current)
                interval.current = null
            }
        }
    }, [isRunning])

    return (
        <div>
            {isOver ? (
                <span style={{ color: '#fd4141' }}>시간 초과 </span>
            ) : (
                <>
                    {minute} : {second}
                </>
            )}
        </div>
    )
}

export default Timer