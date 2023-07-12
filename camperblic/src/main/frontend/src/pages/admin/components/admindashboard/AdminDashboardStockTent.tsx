import React, {useEffect, useState} from 'react';
import {Item} from "../../../../types";
import axios from "axios";
import AdminDashboardStockLayout from "./AdminDashboardStockLayout";

const AdminDashboardStockTent = () => {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/admindashboardstocktent')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminDashboardStockLayout items={items}/>
    );
};

export default AdminDashboardStockTent;