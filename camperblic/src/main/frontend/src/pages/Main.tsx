import '../styles/main.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Item} from "../types";
import axios from "axios";

export default function Main() {

    const [allItems, setAllItems] = useState<Item[]>([]);

    function getRandomItems(items: Item[], count: number): Item[] {
        const shuffledItems = items.sort(() => Math.random() - 0.5);
        return shuffledItems.slice(0, count);
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const [tentResponse, cookResponse, chairResponse, etcResponse, matResponse] = await Promise.all([
                    axios.get('/adminstock/tent'),
                    axios.get('/adminstock/cook'),
                    axios.get('/adminstock/chair'),
                    axios.get('/adminstock/etc'),
                    axios.get('/adminstock/mat'),
                ]);

                const tentItems = tentResponse.data;
                const cookItems = cookResponse.data;
                const chairItems = chairResponse.data;
                const etcItems = etcResponse.data;
                const matItems = matResponse.data;

                const items = [...tentItems, ...cookItems, ...chairItems, ...etcItems, ...matItems];
                setAllItems(items);
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    }, []);

    const randomItems = getRandomItems(allItems, 10);

    return (
        <section>
            <div className="main-content">
                <h1>Welcome to Our Website!</h1>
                <p>Discover amazing deals and discounts on our products.</p>
            </div>

            <div className='main_img'>
                <h2 className='main_img_h2'>추천상품</h2>
                <div className="product-list">
                    {randomItems.map(item => (
                        <Link to={`/itemdetail/${item.categoryId}/${item.itemId}`} className='main_itembox_container' key={item.itemId}>
                            <div className="item-box">
                                <img className='item-box-imgsize' src={item.imagePath} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>{item.price} 원</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}