import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import axios from "axios";
import AdminDashboardBoardLayout from "./AdminDashboardBoardLayout";

const AdminDashboardBoardGatherCamper = () => {

    const [postings, setPostings] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/admindashboard/admindashboardboardgathercamper')
            .then(response => setPostings(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminDashboardBoardLayout postings={postings}/>
    );
};

export default AdminDashboardBoardGatherCamper;