import { useEffect, useState } from "react";

function Searching(){
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch("https://dummyjson.com/users")
        .then(response=>response.json())
        .then((data)=>setData(data.users))
    }, [])

    const filteredUsers = data.filter((user)=>user.firstName.toLowerCase().includes(search.toLowerCase()))
    return(
        <div className="main">
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
            {filteredUsers.map((user, index)=>(
                <p key={index}>{user.firstName}</p>
            ))}
        </div>
    )
}

export default Searching;
