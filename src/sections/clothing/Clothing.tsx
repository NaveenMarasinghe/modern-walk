import { useEffect, useState, useMemo } from "react";
import "./clothing.css";
import Card from "../../components/card/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { ProductAPI } from "../../services/product.services";
import { handleError } from "../../services/errorHandle.services";
import { useQuery } from "react-query";
import { axiosInstance } from "../../services/api.services";

type Props = {
  category: string;
};

export default function Clothing({ category }: Props) {
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

  const { isLoading, data } = useQuery("clothing", async () => {
    const { data } = await axiosInstance.get(`/${category}`);
    return data;
  });

  // const { status, data } = useQuery("clothing", ProductAPI.clothing(category));

  // useEffect(() => {
  //   if (categoryDetails?.url) {
  //     const query = useQuery("clothing", async () => {
  //       const { data } = await axiosInstance.get(`/${category}`);
  //       return data;
  //     });
  //     console.log(query);
  //     // const { status, data, error, isFetching } = ProductAPI.useGetClothing(
  //     //   categoryDetails.url
  //     // );
  //     // console.log(data);
  //   }
  // }, [categoryDetails]);

  return (
    <div>
      <h2>{categoryDetails?.categoryTitle}</h2>
      <div className="clothingContainer">
        {isLoading && <div>Loading...</div>}
        {data?.map((item: Items) => (
          <Card key={item.id} data={item} type={categoryDetails?.id} />
        ))}
      </div>
    </div>
  );
}
