import React, { useState, useEffect } from 'react';

function Timer({ id }) {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div style={{ margin: '10px' }}>
            <h3>Timer {id}: {time}s</h3>
            <button onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={() => setTime(0)} disabled={isRunning}>
                Reset
            </button>
        </div>
    );
}

function ParallelTimer() {
    const timers = [1, 2, 3];
    return (
        <div>
            {timers.map((timer) => (
                <Timer key={timer} id={timer} />
            ))}
        </div>
    );
}

export default ParallelTimer;
