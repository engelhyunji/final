import React, { useState, useEffect, useRef } from 'react';

interface TimerProps {
    mm?: string;
    ss?: string;
    isRunning: boolean;
}

const intToString = (num: number): string => {
    return String(num).padStart(2, '0');
};

const Timer: React.FC<TimerProps> = ({ mm = '0', ss = '0', isRunning }) => {
    const MM = mm ? parseInt(mm) : 0;
    const SS = ss ? parseInt(ss) : 0;

    // 타이머 카운트 값 저장
    const count = useRef<number>(MM * 60 + SS)
    // 실행 중인 타이머 ID 저장
    const interval = useRef<number | null>(null)

    const [minute, setMinute] = useState<string>(intToString(MM));
    const [second, setSecond] = useState<string>(intToString(SS));

    useEffect(() => {
        if (isRunning && !interval.current) {
            interval.current = window.setInterval(() => {
                count.current -= 1

                setMinute(intToString(Math.floor(count.current / 60)))
                setSecond(intToString(count.current % 60))
            }, 1000) as unknown as number
        }

        return () => {
            if (interval.current) {
                clearInterval(interval.current)
                interval.current = null
            }
        };
    }, [isRunning]);

    return (
        <div>
            {minute} : {second}
        </div>
    );
};

export default Timer;