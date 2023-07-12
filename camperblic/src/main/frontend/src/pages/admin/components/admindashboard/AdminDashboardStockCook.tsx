import React, {useEffect, useState} from 'react';
import AdminDashboardStockLayout from "./AdminDashboardStockLayout";
import {Item} from "../../../../types";
import axios from "axios";

const AdminDashboardStockCook = () => {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/admindashboardstockcook')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminDashboardStockLayout items={items}/>
    );
};

export default AdminDashboardStockCook;