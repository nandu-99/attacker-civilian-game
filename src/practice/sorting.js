import { useEffect, useState } from "react"

function Sort(){
    const [data, setData] = useState([])
    const [sort, setSort]=useState("")

    useEffect(()=>{
        fetch("https://dummyjson.com/users")
        .then(response=>response.json())
        .then((data)=>setData(data.users))
    }, [])

    const sortedUsers = data.sort((a, b)=>{
        if(sort=="a-z asc"){
            return a.firstName.localeCompare(b.firstName)
        }else if(sort=="a-z desc"){
            return b.firstName.localeCompare(a.firstName)
        }else if(sort=="age asc"){
            return a.age-b.age
        }else if(sort=="age desc"){
            return b.age-a.age
        }else{
            return 0
        }
    })

    return(
        <>
            <select onChange={(e)=>setSort(e.target.value)}>
                <option value="a-z asc">A</option>
                <option value="a-z desc">B</option>
                <option value="age asc">C</option>
                <option value="age desc">D</option>
            </select>
            {sortedUsers.map((user, i)=>(
                <p key={i}>{user.firstName}  - {user.age}</p>
            ))}
        </>
    )
}

export default Sort
