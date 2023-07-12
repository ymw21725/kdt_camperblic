import React, {useEffect, useState} from 'react';
import {Item} from "../../../../types";
import axios from "axios";
import AdminStockLayout from "./AdminStockLayout";

const AdminStockMat = () => {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get('/adminstock/mat')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminStockLayout items={items} />
    );
};

export default AdminStockMat;