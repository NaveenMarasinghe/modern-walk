import './card.css'

export default function Card({ data, type }) {
    return (
        <div className="cardContainer">
            <div className="cardTitle">
                {data.title}
            </div>
            <div className='cardImage'>
                <img src={data.image} className="cardImageFile"></img>
            </div>
            <div className={"cardBottom" + (type == 1 ? " women" : " men")}>
                <div className="cardPrice">RS {data.price}</div>
                <div className="cardDescription">{data.description.substring(0, 120) + (data.description.length > 120 && "...")}</div>
            </div>
        </div>
    )
}