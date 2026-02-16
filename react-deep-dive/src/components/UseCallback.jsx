import React, { useMemo, useCallback } from "react";

// Child Component
const Child =(({ value, onClick }) => {
  console.log("Child component rendered");

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
});

function UseCallback() {

  // useMemo example
  const memorizeValue = useMemo(() => {
    console.log("useMemo called");

    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += Math.pow(i, 2);
    }

    return result;
  }, []);

  // useCallback example
  const memoizedCallback = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <h1>useMemo + useCallback Demo</h1>

      <Child 
        value={memorizeValue} 
        onClick={memoizedCallback} 
      />
    </div>
  );
}

export default UseCallback;
