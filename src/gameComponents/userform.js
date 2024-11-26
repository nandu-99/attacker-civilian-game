import { useState } from "react";

function UserForm({onSubmit}){
    const [value, setValue] = useState("")
    const handleSubmit = ()=>{
        onSubmit(value)
        setValue("")
    }
    return(
        <div>
            <h4>Username: </h4>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default UserForm;
