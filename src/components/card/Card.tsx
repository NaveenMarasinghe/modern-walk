import "./card.css";
import { Items } from "@typesData/items";
import { useUser } from "../../context/userContext";
import AddToCartModal from "../addToCartModal/AddToCartModal";

type Props = {
  data: Items;
  type?: number;
};

export default function Card({ data, type }: Props) {
  const { user } = useUser();
  return (
    <div className="cardContainer">
      <div className="cardTitle truncate px-10px">{data.title}</div>
      <div className="cardImage">
        <img src={data.image} className="cardImageFile" alt="Clothing"></img>
      </div>
      <div className={"cardBottom" + (type === 1 ? " women" : " men")}>
        <div className="cardPrice">RS {data.price}</div>
        <div className="cardDescription py-[5px]">
          {data.description.substring(0, 140) +
            (data.description.length > 140 && "...")}
        </div>
        {user?.name && <AddToCartModal data={data} />}
      </div>
    </div>
  );
}
