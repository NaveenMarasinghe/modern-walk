import { useEffect, useState } from "react";
import "./clothing.css";
import Card from "../../components/card/Card";
import { Items, ICategoryDetails } from "@typesData/items.d";
import { ProductAPI } from "../../services/product.services";

interface IProps {
  category: string;
}

export default function Clothing({ category }: IProps) {
  const [items, setItems] = useState<Items[] | null>(null);
  const [categoryDetails, setCategoryDetails] =
    useState<ICategoryDetails | null>(null);

  useEffect(() => {
    if (category === "women") {
      setCategoryDetails({
        id: 1,
        categoryTitle: "Women's Clothing",
        url: "women",
      });
    } else if (category === "men") {
      setCategoryDetails({
        id: 2,
        categoryTitle: "Men's Clothing",
        url: "men",
      });
    }
  }, [category]);

  useEffect(() => {
    const fetchItems = async () => {
      if (categoryDetails?.url) {
        await ProductAPI.getClothing(categoryDetails?.url)
          .then(function (response: Items[]) {
            setItems(response);
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };

    fetchItems();
  }, [categoryDetails]);

  return (
    <div>
      <h2>{categoryDetails?.categoryTitle}</h2>
      <div className="clothingContainer">
        {items?.map((item: Items) => (
          <Card key={item.id} data={item} type={categoryDetails?.id} />
        ))}
      </div>
    </div>
  );
}
