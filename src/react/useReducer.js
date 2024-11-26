import { useReducer } from "react";

function UseReducerFunc(){
    const initialState = {count:0}
    const reducer = (state, action)=>{
        switch(action.type){
            case 'increment':return {...state,count: state.count+1}
            case 'decrement':return {...state,count: state.count-1}
            case 'reset': return { ...state, count: 0 };
            default:return state
        }
    }
    const [state, dispatch]  = useReducer(reducer, initialState)
    return(
        <div>
            <p>{state.count}</p>
            <button onClick={()=>dispatch({type:"increment"})}>increment</button>
            <button onClick={()=>dispatch({type:"decrement"})}>decrement</button>
            <button onClick={()=>dispatch({type:"reset"})}>reset</button>
        </div>
    )
}

export default UseReducerFunc
