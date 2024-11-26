import { useEffect, useState } from "react"
import Card from "./card"
import "./card.css"

function Container(){
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=3&_start=${pageNumber}`)
        .then(response=>response.json())
        .then((data)=>setData(data))
    }, [pageNumber])
    return(
        <div className="cards">
            {data.map((post)=>(
                <Card key={post.userId} userId={post.userId} title={post.title} body={post.body}/>
            ))}
            <div className="btn-container">
                <button onClick={()=>{setPageNumber((prev)=>prev-1)}} disabled={pageNumber==1}>PREV</button>
                <p>{pageNumber}</p>
                <button onClick={()=>{setPageNumber((prev)=>prev+1)}}>NEXT</button>
            </div>
        </div>
    )
}

export default Container
