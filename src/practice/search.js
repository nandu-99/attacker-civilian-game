import { useEffect, useState } from "react"

function Search(){
    const [search, setSearch] = useState("")
    const [data, setData]=useState([])
    useEffect(()=>{
        fetch("https://dummyjson.com/users")
        .then(response=>response.json())
        .then((data)=>setData(data.users))
    }, [])
    const fetchedUsers = data.filter((user)=>user.firstName.toLowerCase().includes(search.toLowerCase()))
    return(
        <>
            <h1>Search</h1>
            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}></input>
            {fetchedUsers.map((user, i)=>(
                <p key={i}>{user.firstName}</p>
            ))}
        </>
    )
}

export default Search
