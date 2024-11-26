import { useMemo, useState } from "react";

function ExpensiveCalc(num){
    console.log("calculating.......")
    let result=0;
    for(let i=0;i<=10000;i++){
        result+=num 
    }
    return result;
}

function UseMemoFunc(){
    const [count, setCount] = useState(0)
    const [increment, setIncrement] = useState(1)
    // const calculatedValue = ExpensiveCalc(count)
    const calculatedValue = useMemo(()=>ExpensiveCalc(count), [count])
    return(
        <div>
            <p>{calculatedValue}</p>
            <p>{increment}</p>
            <button onClick={()=> setCount(prev=>prev+1)}>Increment Count</button>
            <button onClick={()=> setIncrement(prev=>prev+1)}>Increase Increment</button>
        </div>
    )
}

export default UseMemoFunc;
