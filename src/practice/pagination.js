import { useEffect, useState } from "react";

function Page(){
    const [current, setCurrent] = useState(1)
    const [data, setData] = useState([])
    const usersPerPage = 10;
    const totalPages = Math.ceil(data.length/usersPerPage)
    useEffect(()=>{
        fetch("https://dummyjson.com/users")
        .then(response=>response.json())
        .then((data)=>setData(data.users))
    }, [])
    const startIndex = (current-1)*usersPerPage
    const fetchedUsers = data.slice(startIndex, startIndex+usersPerPage)
    return(
        <>
            <h1>Page</h1>
            {fetchedUsers.map((user, i)=>(
                <p key={i}>{user.firstName}</p>
            ))}
            <button onClick={()=>{setCurrent((prev)=>prev-1)}} disabled={current==1}>Prev</button>
            <p>{current}</p>
            <button onClick={()=>{setCurrent((prev)=>prev+1)}} disabled={current==totalPages}>Next</button>
        </>
    )
}
export default Page;
