import { useState } from "react";

function Star(){
    const [star, setStar] = useState(0);
    const totalStars = 5;
    const array =[1, 2, 3, 4, 5]
    return(
        <div>
            {array.map((ele, i)=>{
                const startIndex = i+1;
                return(
                    <span key={i} onClick={()=>setStar(startIndex)} style={{
                        fontSize: "100px",
                        cursor: "pointer", "color": startIndex<=star? "gold" : "grey"
                    }}>☆</span>
                )
            })}
        </div>
    )
}

export default Star;
