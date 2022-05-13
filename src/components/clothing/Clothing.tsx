import { useEffect, useState } from "react";
import axios from "axios";
import "./clothing.css";
import Card from "../card/Card";
import { Items } from "../card/Card";

interface IProps {
  category: string;
}

interface ICategoryDetails {
  id: number;
  url?: string;
  category?: string;
}

export default function Clothing({ category }: IProps) {
  const [items, setItems] = useState<Items[] | null>(null);
  const [categoryDetails, setCategoryDetails] =
    useState<ICategoryDetails | null>(null);

  useEffect(() => {
    if (category === "women") {
      setCategoryDetails({
        id: 1,
        category: "Women's Clothing",
        url: "https://fakestoreapi.com/products/category/women's clothing",
      });
    } else if (category === "men") {
      setCategoryDetails({
        id: 2,
        category: "Men's Clothing",
        url: "https://fakestoreapi.com/products/category/men's clothing",
      });
    }
  }, [category]);

  useEffect(() => {
    const fetchItems = async () => {
      if (categoryDetails?.url) {
        const response: Items[] = await fetch(categoryDetails?.url).then(
          (res) => res.json()
        );
        setItems(response);
      }
    };
    // const fetchItems = async () => {
    //     const res = await axios.get(categoryDetails?.url);
    //     console.log(res.data);
    //     setItems(res.data);
    // }
    fetchItems();
  }, [categoryDetails]);

  return (
    <div>
      <h2>{categoryDetails?.category}</h2>
      <div className="clothingContainer">
        {items?.map((item: Items) => (
          <Card key={item.id} data={item} type={categoryDetails?.id} />
        ))}
      </div>
    </div>
  );
}
