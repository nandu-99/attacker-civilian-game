import { useEffect, useState } from "react"

function UseEffectFunc(){
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>response.json())
        .then(data=>setData(data))
    },[])
    return(
        <div>
            {data.slice(0, 10).map((post)=>(
                <p key={post.id}>{post.title}</p>
            ))}
        </div>
    )
}

export default UseEffectFunc
