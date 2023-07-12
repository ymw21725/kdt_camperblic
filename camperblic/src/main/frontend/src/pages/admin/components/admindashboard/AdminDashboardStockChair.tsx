import React, {useEffect, useState} from 'react';
import AdminDashboardStockLayout from "./AdminDashboardStockLayout";
import {Item} from "../../../../types";
import axios from "axios";

const AdminDashboardStockChair = () => {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/admindashboardstockchair')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminDashboardStockLayout items={items}/>
    );
};

export default AdminDashboardStockChair;