import React, { useEffect, useState } from 'react';
import { Item } from "../../types";
import axios from "axios";
import ItemLayOut from "./ItemLayOut";

const Etc = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchItems = () => {
        setIsLoading(true);
        axios.get('/cook')
            .then(response => setItems(prevItems => [...prevItems, ...response.data]))
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const loadMoreItems = () => {
        fetchItems();
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <ItemLayOut items={items} topText="취사용품" onLoadMore={loadMoreItems} fetchItems={fetchItems}/>
    );
};

export default Etc;