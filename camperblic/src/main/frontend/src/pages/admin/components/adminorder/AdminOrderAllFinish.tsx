import React, {useEffect, useState} from 'react';
import {Tmp} from "../../../../types";
import axios from "axios";
import AdminOrderLayout from "./AdminOrderLayout";

const AdminOrderPaymentFinish = () => {

    const [tmp, setTmp] = useState<Tmp[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/orderallfinish')
            .then(response => setTmp(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminOrderLayout tmp={tmp} />
    );
};

export default AdminOrderPaymentFinish;