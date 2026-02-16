import React, { useState, useMemo, useEffect } from 'react';

function UseMemoCorrected() {
  const [count, setCount] = useState(0);

  // ✅ CORRECT USE OF useMemo:
  // "Calculate this value and STORE it in a variable."
  // We are not just logging; we are returning a result to use later.
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    let total = 0;
    for (let i = 0; i < 1000; i++) {
      total += Math.pow(i, 2);
    }
    return total; // <--- useMemo MUST return something!
  }, []); // Empty dependency = Run once and remember forever.


  // ✅ CORRECT USE OF Timer:
  // Timers are "Side Effects", so they go in useEffect.
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // CLEANUP FUNCTION:
    // Extremely important! If the component is removed, kill the timer.
    return () => clearInterval(timer);
  }, []);


  return (
    <div>
      <h1>Count: {count}</h1>
      {/* We use the calculated value here */}
      <h2>Calculated Result: {expensiveValue}</h2> 
    </div>
  );
}

export default UseMemoCorrected;