import { useEffect, useState } from "react"

function Auto() {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => {
        fetch("https://dummyjson.com/users")
            .then(response => response.json())
            .then((data) => setData(data.users))
    }, [])

    return (
        <div style={{ position: "relative", width: "300px" }}>
            <input
                type="text"
                list="suggestions"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                placeholder="Search users..."
                style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                }}
            />
            <datalist id="suggestions" style={{background:"red"}}>
                {data.map((user, i) => (
                    <option key={i} value={user.firstName} />
                ))}
            </datalist>
        </div>
    )
}

export default Auto
