import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import axios from "axios";
import AdminDashboardBoardLayout from "./AdminDashboardBoardLayout";

const AdminDashboardBoardFreeboard = () => {

    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/admindashboardboardfreeboard')
            .then(response => setPostings(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminDashboardBoardLayout postings={postings}/>
    );
};

export default AdminDashboardBoardFreeboard;