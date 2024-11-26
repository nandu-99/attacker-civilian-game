import { useCallback, useState } from "react";

function Button({ handleClick, children }) {
  console.log("rendering.....");
  return <button onClick={handleClick}>{children}</button>;
}

function UseCallbackFunc() {
  const [count, setCount] = useState(0);
  const [increment, setIncrement] = useState(1);
  const [change, setChange] = useState(0)
  const handleIncrement = useCallback(() => {
    console.log("created")
    setCount((prev) => prev + increment);
  }, [increment]);
// const handleIncrement = ()=>{
//     console.log("created")
//     setCount((prev)=>prev+increment)
// }
  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Increment: {increment}</h2>
        <h3>{change}</h3>
      <Button handleClick={handleIncrement}>Increment Count</Button>
      <button onClick={() => setIncrement(increment + 1)}>
        Change Increment
      </button>
      <button onClick={()=>setChange(change+1)}>Change</button>
    </div>
  );
}

export default UseCallbackFunc;
