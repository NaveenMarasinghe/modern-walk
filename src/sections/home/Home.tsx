import { useEffect, useState } from "react";
import "./home.css";
import Card from "../../components/card/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { Items } from "@typesData/items.d";
import { ProductAPI } from "../../services/product.services";

const Home: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      await ProductAPI.getClothing("clothing")
        .then(function (response: Items[]) {
          setItems(response);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchItems();
  }, []);

  return (
    <div className="homeContainer">
      <h2>Flash sale</h2>
      <div className="homeFlashSaleItems">
        {items.map((item) => (
          <Card key={item.id} data={item} />
        ))}
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
};

export default Home;
