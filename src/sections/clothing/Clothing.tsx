import { useEffect, useState } from "react";
import "./clothing.css";
import Card from "../../components/card/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { ProductAPI } from "../../services/product.services";
import { handleError } from "../../services/errorHandle.services";

type Props = {
  category: string;
};

export default function Clothing({ category }: Props) {
  const [items, setItems] = useState<Items[] | null>(null);
  const [categoryDetails, setCategoryDetails] =
    useState<CategoryDetails | null>(null);

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
        const response: any = await ProductAPI.getClothing(
          categoryDetails?.url
        );
        if (!response.error) {
          console.log(response.data);
          setItems(response.data);
        }
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
