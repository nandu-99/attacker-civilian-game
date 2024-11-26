import { useRef } from "react"
function UseRefFunc(){
    const ref = useRef(null)
    const focusInput = ()=>{
        ref.current.focus();
    }
    return(
        <div>
            <input ref={ref} type="text"></input>
            <button onClick={focusInput}>Focus</button>
        </div>
    )
}
export default UseRefFunc
