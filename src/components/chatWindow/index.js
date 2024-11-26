import { useState } from "react"
import "./style.css"
function ChatWindow(){
    const [sendMessages, setSendMessages]= useState([])
    const [recieveMessages, setRecieveMessages] = useState([])
    return(
        <div className="window">
            <h1 className="chat">ChatWindow</h1>
        </div>
    )
}

export default ChatWindow
