import { useEffect, useState } from "react"

function Pagination(){
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10;
    const totalPages = Math.ceil(data.length/usersPerPage)
    useEffect(()=>{
        fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setData(data.users));
    }, [])
    const startIndex = (currentPage-1)*usersPerPage
    const filteredUsers = data.slice(startIndex, startIndex+usersPerPage)
    return(
        <div>
            <p>{currentPage}</p>
            <button onClick={()=>setCurrentPage((prev)=>prev+1)} disabled={currentPage==totalPages}>Next</button>
            <button onClick={()=>setCurrentPage((prev)=>prev-1)} disabled={currentPage==1}>Prev</button>
            <ul>
            {filteredUsers.map((user, index)=>(
                <li key={index}>{user.firstName}</li>
            ))}
            </ul>
        </div>
    )
}
export default Pagination
