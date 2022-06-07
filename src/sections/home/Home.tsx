import "./home.css";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductAPI } from "src/services/product.services";
import { Items } from "@typesData/items";

export default function Home() {
  const { isLoading, data } = useQuery("clothing", () => {
    return ProductAPI.clothing("clothing");
  });
  console.log(data?.result?.data);
  return (
    <div className="homeContainer">
      <h2>Flash sale</h2>
      <div className="homeFlashSaleItems">
        {isLoading && <div>Loading...</div>}
        {!data?.error ? (
          data?.result?.data?.map((item: Items) => (
            <Card key={item.id} data={item} />
          ))
        ) : (
          <div>{data?.error.message}</div>
        )}
      </div>
      <div className="homeCategories">
        <h2>Categories</h2>
        <div className="homeCategoriesItems">
          <Link to="/mens-clothing" style={{ textDecoration: "none" }}>
            <div className="categoryCard men">Men's Clothing</div>
          </Link>
          <Link to="/womens-clothing" style={{ textDecoration: "none" }}>
            <div className="categoryCard women">Women's Clothing</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
