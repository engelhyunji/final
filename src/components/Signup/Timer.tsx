import React, { useState, useEffect, useRef } from 'react'

interface TimerProps {
    mm?: string
    ss?: string
    isRunning: boolean
}

const intToString = (num: number): string => {
    return String(num).padStart(2, '0')
}

const Timer: React.FC<TimerProps> = ({ mm = '0', ss = '0', isRunning, }) => {
    const MM = mm ? parseInt(mm) : 0
    const SS = ss ? parseInt(ss) : 0

    const count = useRef<number>(MM * 60 + SS)
    const interval = useRef<NodeJS.Timeout | null>(null)

    const [minute, setMinute] = useState<string>(intToString(MM))
    const [second, setSecond] = useState<string>(intToString(SS))

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(() => {
                count.current -= 1

                setMinute(intToString(Math.floor(count.current / 60)))
                setSecond(intToString(count.current % 60))
            }, 1000)
        } else {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }

        return () => {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
    }, [isRunning])

    return (
        <div>
            {minute} : {second}
        </div>
    )
}

export default Timer
