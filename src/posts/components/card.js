import "./card.css"
function Card({userID, title, body}){
    return(
        <div className="main">
            <div className="title">
                <div className="left">
                    <h4>{title}</h4>
                    <p>emma davis</p>
                </div>
                <p>yesterday</p>
            </div>
            <div className="content">
                {body}
            </div>
            <div className="extra">
                <div className="likes-comments">
                    <p className="likes">89 likes</p>
                    <p className="comments">31 comments</p>
                </div>
                <p className="share">share</p>
            </div>
        </div>
    )
}
export default Card
