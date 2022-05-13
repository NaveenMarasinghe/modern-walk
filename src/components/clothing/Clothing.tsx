import { useEffect, useState } from "react";
import "./clothing.css";
import Card from '../card/Card'

export default function Clothing({ category }) {

    const [items, setItems] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState({});

    useEffect(() => {
        if (category === 'women') {
            setCategoryDetails({ id: 1, category: "Women's Clothing", url: "https://fakestoreapi.com/products/category/women's clothing" })
        } else if (category === 'men') {
            setCategoryDetails({ id: 2, category: "Men's Clothing", url: "https://fakestoreapi.com/products/category/men's clothing" })
        }
    }, [category]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(categoryDetails.url)
                .then(res => res.json())
            setItems(response);
        }
        fetchItems();
    }, [categoryDetails]);

    return (
        <div>
            <h2>{categoryDetails.category}</h2>
            <div className="clothingContainer">
                {items.map((item) => (
                    <Card key={item.id} data={item} type={categoryDetails.id} />
                ))}
            </div>
        </div>
    )
}