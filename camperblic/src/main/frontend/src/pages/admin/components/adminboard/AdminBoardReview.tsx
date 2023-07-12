import React, {useEffect, useState} from 'react';
import {Posting} from "../../../../types";
import axios from "axios";
import AdminBoardLayout from "./AdminBoardLayout";

const AdminBoardReview = () => {
    const [postings, setItems] = useState<Posting[]>([]);

    useEffect(() => {
        axios.get('/adminboard/adminboardreview')
            .then(response => setItems(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <AdminBoardLayout postings={postings} category="reviewcamping"/>
    );
};

export default AdminBoardReview;