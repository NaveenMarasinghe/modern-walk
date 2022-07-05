import "./card.css";
import { Items } from "@typesData/items";
import { useUser } from "../../context/userContext";
import AddToCartPopover from "../addToCartPopover/AddToCartPopover";
import AddToCartModal from "../addToCartModal/AddToCartModal";

type Props = {
  data: Items;
  type?: number;
};

export default function Card({ data, type }: Props) {
  const { user } = useUser();
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
        {/* {user?.name && (
          <AddToCartPopover
            id={data.id}
            title={data.title}
            price={data.price}
          />
        )} */}
        {user?.name && <AddToCartModal data={data} />}
      </div>
    </div>
  );
}
