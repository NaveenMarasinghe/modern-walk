import { useEffect, useState } from "react";
import "./clothing.css";
import Card from "../../components/card/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { useQuery } from "react-query";
import { ProductAPI } from "../../services/product.services";
import { ClothingType } from "../../services/product.services";

type ClothingProp = {
  category: ClothingType;
};

export default function Clothing({ category }: ClothingProp) {
  const [categoryDetails, setCategoryDetails] =
    useState<CategoryDetails | null>(null);

  const { isLoading, data } = useQuery(category, async () => {
    return await ProductAPI.clothing(category);
  });

  useEffect(() => {
    switch (category) {
      case "women":
        setCategoryDetails({
          id: 1,
          categoryTitle: "Women's Clothing",
          url: "women",
        });
        break;
      case "men":
        setCategoryDetails({
          id: 2,
          categoryTitle: "Men's Clothing",
          url: "men",
        });
        break;
    }
  }, [category]);

  return (
    <div>
      <h2>{categoryDetails?.categoryTitle}</h2>
      <div className="clothingContainer">
        {isLoading && <div>Loading...</div>}
        {!data?.error ? (
          data?.result?.data?.map((item: Items) => (
            <Card key={item.id} data={item} type={categoryDetails?.id} />
          ))
        ) : (
          <div>{data?.error?.message}</div>
        )}
      </div>
    </div>
  );
}
