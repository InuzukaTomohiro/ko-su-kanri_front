import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
    const [timer, setTimer] = useState([{ hours: 0, minutes: 0, seconds: 0 }]);
    const timerRef = useRef<number | null>(null);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [startFlag, setStartFlag] = useState<boolean>(false);

    const countIncrement = () => {
        setSeconds((prevSeconds) => {
            const newSeconds = (prevSeconds + 1) % 60;
            setMinutes((prevMinutes) => {
                const newMinutes = prevMinutes + Math.floor((prevSeconds + 1) / 60);
                setHours((prevHours) => prevHours + Math.floor(newMinutes / 60));
                return newMinutes % 60;
            });
            return newSeconds;
        });

        timerRef.current = window.setTimeout(countIncrement, 1000);
    };


    useEffect(() => {
        if (startFlag) {
            timerRef.current = window.setTimeout(countIncrement, 1000);
            return () => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                console.log("タイマーが解除されました。");
            };
        }
    }, [startFlag]);

    const timerStop = () => {
        setStartFlag(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const timerStart = () => {
        setStartFlag(true);
    };

    const timerReset = () => {
        setStartFlag(false);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const timerPlus = () => {
        setSeconds((prevSeconds) => (prevSeconds + 10));
        // setMinutes((prevMinutes) => (prevMinutes + 1));
        // setHours((prevHours) => prevHours + Math.floor((minutes + 1) / 60));
    };

    const addTimer = () => {
        setTimer((prevTimer) => [...prevTimer, { hours: 0, minutes: 0, seconds: 0 }]);
    };

    return (
        <div className="App">
            <p>現在の時間: {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
            {startFlag ? <button onClick={timerStop}>STOP</button> : <button onClick={timerStart}>START</button>}
            <button onClick={timerReset}>RESET</button>
            <button onClick={timerPlus}>+10秒</button>
            <button onClick={addTimer}>タイマー追加</button>
        </div>
    );
};

export default Timer;
