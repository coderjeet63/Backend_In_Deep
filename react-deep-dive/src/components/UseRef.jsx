import React, { useRef, useState } from "react";

function UseRef() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const handleEnd = () => {
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setTime(0);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>Time: {time}</p>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleEnd}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default UseRef;
