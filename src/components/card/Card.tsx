import "./card.css";
import { Items } from "@typesData/TypesData";

export type Props = {
  data: Items;
  type?: number;
};

export default function Card({ data, type }: Props) {
  return (
    <div className="cardContainer">
      <div className="cardTitle">{data.title}</div>
      <div className="cardImage">
        <img src={data.image} className="cardImageFile" alt="Clothing"></img>
      </div>
      <div className={"cardBottom" + (type === 1 ? " women" : " men")}>
        <div className="cardPrice">RS {data.price}</div>
        <div className="cardDescription">
          {data.description.substring(0, 120) +
            (data.description.length > 120 && "...")}
        </div>
      </div>
    </div>
  );
}
