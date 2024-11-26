import { useEffect, useState } from "react"

function Infinite(){
    const [data, setData] = useState([])
    const [pageLimit, setPageLimit] = useState(1)
    useEffect(()=>{
        fetch(`https://dummyjson.com/users?limit=20&skip=${pageLimit * 10}`)
        .then(response=>response.json())
        .then((data)=>setData((prev)=>[...prev, ...data.users]))
    }, [pageLimit])
    function reachedBottom(){
        if(window.innerHeight+document.documentElement.scrollTop>=document.documentElement.scrollHeight){
            return true
        }
        return false
    }

    function handleScroll(){
        if(reachedBottom()){
            setPageLimit((prev)=>prev+1)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return ()=>{window.removeEventListener("scroll", handleScroll)}
    }, [])
    return(
        <>
            {data.map((user, i)=>(
                <p key={i}>{user.firstName}</p>
            ))}
        </>
    )
}
export default Infinite
