import "./card.css";

export type Items = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

interface Props {
  data: Items;
  type?: number;
}

export default function Card({ data, type }: Props) {
  return (
    <div className="cardContainer">
      <div className="cardTitle">{data.title}</div>
      <div className="cardImage">
        <img src={data.image} className="cardImageFile"></img>
      </div>
      <div className={"cardBottom" + (type == 1 ? " women" : " men")}>
        <div className="cardPrice">RS {data.price}</div>
        <div className="cardDescription">
          {data.description.substring(0, 120) +
            (data.description.length > 120 && "...")}
        </div>
      </div>
    </div>
  );
}
