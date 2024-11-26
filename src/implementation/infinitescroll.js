import { useEffect, useState } from "react";

function InfinteScroll(){
    const [pageLimit, setPageLimit] = useState(1)
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(`https://dummyjson.com/users?limit=20&skip=${pageLimit * 10}`)
      .then((response) => response.json())
      .then((data) => setData((prev) => [...prev, ...data.users]));
    }, [pageLimit])

    function reachedBottom(){
        if(window.innerHeight+document.documentElement.scrolltop>=document.documentElement.scrollHeight){
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
        document.addEventListener("scroll", handleScroll)
        return ()=>{document.removeEventListener("scroll", handleScroll)}
    }, [])
    return(
        <div className="App">
        <h1>Hello CodeSandbox</h1>
        {data.map((val, index) => (
          <p key={index}>{val.firstName}</p>
        ))}
      </div>
    )
}   
export default InfinteScroll;
