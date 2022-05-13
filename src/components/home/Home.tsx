import { useEffect, useState } from "react";
import "./home.css";
import Card from '../card/Card'
import axios from 'axios';
import { Link } from "react-router-dom";

export default function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await axios.get('https://fakestoreapi.com/products?limit=4');
            console.log(res.data);
            setItems(res.data);
        }
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
                    <Link to="/mens-clothing" style={{ textDecoration: "none" }}><div className="categoryCard men">Men's Clothing</div></Link>
                    <Link to="/womens-clothing" style={{ textDecoration: "none" }}><div className="categoryCard women">Women's Clothing</div></Link>
                </div>
            </div>
        </div>
    )
}